import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from "./todolist-reducer";

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
   isDone: boolean
}
export type changeTaskTitleActionType = {
   type: "CHANGE-TASK-TITLE"
   taskId: string
   todoListID: string
   title: string
}

type ActionType =
  RemoveTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

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
         const newTask = {id: v1(), title: action.title, isDone: false}
         stateCopy[action.todoListID] = [newTask, ...tasks]
         return stateCopy
      }
      case  "CHANGE-TASK-STATUS": {
         const stateCopy = {...state}
         const task = state[action.todoListID].find((t) => t.id === action.taskId)
         if (task) {
            task.isDone = action.isDone
         }
         return stateCopy
      }
      case  "CHANGE-TASK-TITLE": {
         const stateCopy = {...state}
         const task = state[action.todoListID].find((t) => t.id === action.taskId)
         if (task) {
            task.title = action.title
         }
         return stateCopy
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
export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean): changeTaskStatusActionType => {
   return {type: "CHANGE-TASK-STATUS", todoListID: todoListID, taskId: taskId, isDone: isDone}
}

export const changeTaskTitleAC = (todoListID: string, taskId: string, title: string): changeTaskTitleActionType => {
   return {type: "CHANGE-TASK-TITLE", todoListID: todoListID, taskId: taskId, title: title}
}
