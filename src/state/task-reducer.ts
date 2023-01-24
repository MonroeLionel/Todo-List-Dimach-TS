import {TaskStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsApi, TodoTaskPriorities, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type RemoveTaskActionType = {
   type: "REMOVE-TASK"
   todoListId: string
   taskId: string
}
export type addTaskActionType = {
   type: "ADD-TASK"
   task: TaskType
}
export type UpdateTaskActionType = {
   type: "UPDATE-TASK"
   taskId: string
   todoListID: string
   model: UpdateDomainTaskModelType
}
export type changeTaskTitleActionType = {
   type: "CHANGE-TASK-TITLE"
   taskId: string
   todoListID: string
   title: string
}

export type SetTasksActionType = {
   type: "SET-TASKS"
   tasks: Array<TaskType>
   todolistId: string
}

type ActionType =
  RemoveTaskActionType
  | addTaskActionType
  | UpdateTaskActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
   switch (action.type) {
      case "REMOVE-TASK": {
         const stateCopy = {...state}
         const tasks = state[action.todoListId]
         const filteredTask = tasks.filter(t => t.id !== action.taskId)
         stateCopy[action.todoListId] = filteredTask

         return stateCopy
      }
      case "ADD-TASK": {
         const stateCopy = {...state}
         const newTask = action.task
         const tasks = stateCopy[newTask.todoListId]
         const newTasks = [newTask, ...tasks]
         stateCopy[newTask.todoListId] = newTasks
         return stateCopy
      }
      case  "UPDATE-TASK": {
         let todolistTasks = state[action.todoListID]
         state[action.todoListID] = todolistTasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
         return {...state}
      }
      case  "CHANGE-TASK-TITLE": {
         let todolistTasks = state[action.todoListID]
         state[action.todoListID] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
         return {...state}
      }
      case "ADD-TODOLIST": {
         const stateCopy = {...state}
         stateCopy[action.todolist.id] = []


         return stateCopy
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
         const stateCopy = {...state}
         stateCopy[action.todolistId] = action.tasks
         return stateCopy
      }
      default:
         return state
   }
}

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
   return {type: "REMOVE-TASK", todoListId: todoListId, taskId: taskId}
}
export const addTaskAC = (task: TaskType): addTaskActionType => {
   return {type: "ADD-TASK", task}
}
export const updateTaskAC = (todoListID: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
   return {type: "UPDATE-TASK", todoListID: todoListID, taskId: taskId, model}
}

export const changeTaskTitleAC = (todoListID: string, taskId: string, title: string): changeTaskTitleActionType => {
   return {type: "CHANGE-TASK-TITLE", todoListID: todoListID, taskId: taskId, title: title}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
   return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      todolistsApi.getTasks(todolistId)
        .then((res) => {
           dispatch(setTasksAC(res.data.items, todolistId))
        })
   }
}


export const removeTaskTC = (taskId: string, todoListId: string) => {
   return (dispatch: Dispatch) => {
      todolistsApi.deliteTask(todoListId, taskId)
        .then((res) => {
           const action = removeTaskAC(todoListId, taskId)
           dispatch(action)
        })
   }
}


export const addTaskTC = (todoListId: string, title: string) => {

   return (dispatch: Dispatch) => {
      todolistsApi.createTasks(todoListId, title)

        .then((res) => {
           const task = res.data.data.item
           const action = addTaskAC(task)
           dispatch(action)
        })
   }
}

type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TodoTaskPriorities
   startDate?: string
   deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {

   return (dispatch: Dispatch, getState: () => AppRootState) => {

      const state = getState()
      const task = state.tasks[todoListId].find(t => t.id === taskId)
      if (!task) {
         console.warn("task not found in the state")
         return
      }
      const apiModel: UpdateDomainTaskModelType = {
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