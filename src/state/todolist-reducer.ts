import {v1} from "uuid";
import {TodoListType} from "../api/todolists-api";

export type RemoveTodolistActionType = {
   type: "REMOVE-TODOLIST"
   id: string
}
export type AddTodolistActionType = {
   type: "ADD-TODOLIST"
   title: string
   todolistID: string
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
export type FilterValueType = `all` | `completed` | `active`

export type TodolistDomainType = TodoListType & {
   filter: FilterValueType
}

type ActionType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChengeTodolistTitleActionType
  | ChengeTodolistFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id != action.id)
      }
      case "ADD-TODOLIST": {

         return [{
            id: action.todolistID,
            title: action.title,
            filter: "all",
            addedDate: '',
            order: 0
         }, ...state]
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
         return state
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
   return {type: "ADD-TODOLIST", title: title, todolistID: v1()}
}
export const changeTodolistTitleAC = (title: string, id: string): ChengeTodolistTitleActionType => {
   return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChengeTodolistFilterActionType => {
   return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}