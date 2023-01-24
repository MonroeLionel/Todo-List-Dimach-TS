import {v1} from "uuid";
import {todolistsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
   type: "REMOVE-TODOLIST"
   id: string
}
export type AddTodolistActionType = {
   type: "ADD-TODOLIST"
   todolist: TodoListType
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
export type SetTodolistsActionType = {
   type: "SET-TODOLISTS"
   todolists: Array<TodoListType>
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
  | SetTodolistsActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id != action.id)
      }
      case "ADD-TODOLIST": {
         const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
         return [newTodolist, ...state]
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
      case "SET-TODOLISTS": {
         return action.todolists.map(tl => {
            return {
               ...tl,
               filter: "all"
            }
         })
      }

      default:
         return state
   }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (todolist: TodoListType): AddTodolistActionType => {
   return {type: "ADD-TODOLIST", todolist}
}
export const changeTodolistTitleAC = (title: string, id: string): ChengeTodolistTitleActionType => {
   return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChengeTodolistFilterActionType => {
   return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export const SetTodolistsAC = (todolists: Array<TodoListType>): SetTodolistsActionType => {
   return {type: "SET-TODOLISTS", todolists: todolists}
}


export const fetchTodolistsTC = () => {
   return (dispatch: Dispatch) => {
      todolistsApi.getTodolists()
        .then((res) => {
           dispatch(SetTodolistsAC(res.data))
        })
   }
}


export const removeTodolistsTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      todolistsApi.deliteTodolists(todolistId)
        .then((res) => {
           dispatch(removeTodolistAC(todolistId))
        })
   }
}

export const addTodolistsTC = (title: string) => {
   return (dispatch: Dispatch) => {
      todolistsApi.createTodolists(title)
        .then((res) => {
           dispatch(addTodolistAC(res.data.data.item))
        })
   }
}


export const changeTodolistTitleTC = (title: string, id: string) => {
   return (dispatch: Dispatch) => {
      todolistsApi.updateTodolists(id, title)
        .then((res) => {
           dispatch(changeTodolistTitleAC(title, id))
        })
   }
}

