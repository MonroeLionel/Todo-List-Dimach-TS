import {TaskStateType} from "../App";
import {v1} from "uuid";
import {
   AddTodolistActionType,
   RemoveTodolistActionType, SetTodolistsAC,
   SetTodolistsActionType,
   todoListId1,
   todoListId2
} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsApi, TodoTaskPriorities} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTaskActionType = {
   type: "REMOVE-TASK"
   todoListId: string
   taskId: string
}
export type addTaskActionType = {
   type: "ADD-TASK"
   todoListID: string
   title: string
}
export type changeTaskStatusActionType = {
   type: "CHANGE-TASK-STATUS"
   taskId: string
   todoListID: string
   status: TaskStatuses
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
  | changeTaskStatusActionType
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
         const tasks = state[action.todoListID]
         const newTask: TaskType = {
            id: v1(), title: action.title, status: TaskStatuses.New,
            todoListId: action.todoListID,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         }
         stateCopy[action.todoListID] = [newTask, ...tasks]
         return stateCopy
      }
      case  "CHANGE-TASK-STATUS": {
         let todolistTasks = state[action.todoListID]
         state[action.todoListID] = todolistTasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
         return {...state}
      }
      case  "CHANGE-TASK-TITLE": {
         let todolistTasks = state[action.todoListID]
         state[action.todoListID] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
         return {...state}
      }
      case "ADD-TODOLIST": {
         const stateCopy = {...state}
         stateCopy[action.todolistID] = []


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
export const addTaskAC = (todoListID: string, title: string): addTaskActionType => {
   return {type: "ADD-TASK", todoListID: todoListID, title: title}
}
export const changeTaskStatusAC = (todoListID: string, taskId: string, status: TaskStatuses): changeTaskStatusActionType => {
   return {type: "CHANGE-TASK-STATUS", todoListID: todoListID, taskId: taskId, status}
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
