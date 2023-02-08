import {TaskStateType} from "../../../trash/App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolist-reducer";
import {
   TaskStatuses,
   TaskType,
   todolistsApi,
   TodoTaskPriorities,
   UpdateTaskModelType
} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../../app/store";
import {setErrorAC, setErrorActionType, setStatusAC, setStatusActionType} from "../../../app/app-reducer";


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
   switch (action.type) {
      case "REMOVE-TASK":
         return {
            ...state,
            [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
         }
      case "ADD-TASK":
         return {
            ...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
         }
      case  "UPDATE-TASK":
         return {
            ...state,
            [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
         }
      case "ADD-TODOLIST":
         return {
            ...state,
            [action.todolist.id]: []
         }
      case "REMOVE-TODOLIST": {
         const stateCopy = {...state}
         delete stateCopy[action.id]
         return stateCopy
      }
      case "SET-TODOLISTS": {
         const stateCopy = {...state}
         action.todolists.forEach(tl => {
            stateCopy[tl.id] = []
         })
         return stateCopy
      }
      case "SET-TASKS": {
         return {...state, [action.todolistId]: action.tasks}
      }
      default:
         return state
   }
}

// actions
export const removeTaskAC = (todoListId: string, taskId: string) => {
   return {type: "REMOVE-TASK", todoListId: todoListId, taskId: taskId} as const
}
export const addTaskAC = (task: TaskType) => {
   return {type: "ADD-TASK", task} as const
}
export const updateTaskAC = (todoListID: string, taskId: string, model: UpdateDomainTaskModelType) => {
   return {type: "UPDATE-TASK", todoListID: todoListID, taskId: taskId, model} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
   return {type: "SET-TASKS", tasks, todolistId} as const
}

// thunks
export const fetchTasksTC = (todolistId: string) => {

   return (dispatch: Dispatch<ActionType>) => {
      dispatch(setStatusAC("loading"))
      todolistsApi.getTasks(todolistId)
        .then((res) => {
           dispatch(setTasksAC(res.data.items, todolistId))
           dispatch(setStatusAC("succeed"))
        })
   }
}
export const removeTaskTC = (taskId: string, todoListId: string) => {
   return (dispatch: Dispatch<ActionType>) => {
      todolistsApi.deliteTask(todoListId, taskId)
        .then((res) => {
           const action = removeTaskAC(todoListId, taskId)
           dispatch(action)
        })
   }
}
export const addTaskTC = (todoListId: string, title: string) => {

   return (dispatch: Dispatch<ActionType>) => {
      dispatch(setStatusAC("loading"))
      todolistsApi.createTasks(todoListId, title)

        .then((res) => {
           if (res.data.resultCode === 0) {
              const task = res.data.data.item
              const action = addTaskAC(task)
              dispatch(action)
              dispatch(setStatusAC("succeed"))
           } else {
              if (res.data.messages.length) {
                 dispatch(setErrorAC(res.data.messages[0]))
              } else {
                 dispatch(setErrorAC("sum error"))
              }
           }
           dispatch(setStatusAC("failed"))
        })
   }
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {

   return (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {

      const state = getState()
      const task = state.tasks[todoListId].find(t => t.id === taskId)
      if (!task) {
         console.warn("task not found in the state")
         return
      }
      const apiModel: UpdateTaskModelType = {
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate,
         title: task.title,
         status: task.status,
         ...domainModel
      }
      todolistsApi.updateTask(todoListId, taskId, apiModel)
        .then((res) => {
           const action = updateTaskAC(todoListId, taskId, domainModel)
           dispatch(action)
        })
   }
}

// types
type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TodoTaskPriorities
   startDate?: string
   deadline?: string
}

type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | setErrorActionType
  | setStatusActionType
