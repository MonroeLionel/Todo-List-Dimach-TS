import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
   type: "REMOVE-TODOLIST"
   id: string
}
export type AddTodolistActionType = {
   type: "ADD-TODOLIST"
   title: string
}
export type ChengeTodolistTitleActionType = {
   type: "CHANGE-TODOLIST-TITLE"
   id: string
   title: string
}
export type ChengeTodolistFilterActionType = {
   type: "CHANGE-TODOLIST-FILTER"
   id: string
   filter: FilterValueType
}

type ActionType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChengeTodolistTitleActionType
  | ChengeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id != action.id)
      }
      case "ADD-TODOLIST": {
         return [...state, {
            id: v1(),
            title: action.title,
            filter: "all"
         }]
      }
      case "CHANGE-TODOLIST-TITLE": {
         const todoList = state.find(tl => tl.id === action.id)
         if (todoList) {
            todoList.title = action.title

         }
         return [...state]
      }
      case "CHANGE-TODOLIST-FILTER": {
         const todoList = state.find(tl => tl.id === action.id)
         if (todoList) {
            todoList.filter = action.filter

         }
         return [...state]
      }

      default:
         throw new Error("i dont understading this action type")
   }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
   return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChengeTodolistTitleActionType => {
   return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const ChangeTodolistFilterAC = (filter: FilterValueType, id: string): ChengeTodolistFilterActionType => {
   return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}