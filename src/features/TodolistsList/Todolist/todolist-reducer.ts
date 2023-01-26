import {v1} from "uuid";
import {todolistsApi, TodoListType} from "../../../api/todolists-api";
import {Dispatch} from "redux";


export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id != action.id)
      }
      case "ADD-TODOLIST": {
         return [{...action.todolist, filter: "all"}, ...state]
      }
      case "CHANGE-TODOLIST-TITLE": {
         return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      }
      case "CHANGE-TODOLIST-FILTER": {
         return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      }
      case "SET-TODOLISTS": {
         return action.todolists.map(tl => ({...tl, filter: "all"}))
      }
      default:
         return state
   }
}
//action
export const removeTodolistAC = (todolistId: string) => {
   return {type: "REMOVE-TODOLIST", id: todolistId} as const
}
export const addTodolistAC = (todolist: TodoListType) => {
   return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistTitleAC = (title: string, id: string) => {
   return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
}
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) => {
   return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter} as const
}
export const SetTodolistsAC = (todolists: Array<TodoListType>) => {
   return {type: "SET-TODOLISTS", todolists: todolists} as const
}

//thunk
export const fetchTodolistsTC = () => {
   return (dispatch: Dispatch<ActionType>) => {
      todolistsApi.getTodolists()
        .then((res) => {
           dispatch(SetTodolistsAC(res.data))
        })
   }
}
export const removeTodolistsTC = (todolistId: string) => {
   return (dispatch: Dispatch<ActionType>) => {
      todolistsApi.deliteTodolists(todolistId)
        .then((res) => {
           dispatch(removeTodolistAC(todolistId))
        })
   }
}
export const addTodolistsTC = (title: string) => {
   return (dispatch: Dispatch<ActionType>) => {
      todolistsApi.createTodolists(title)
        .then((res) => {
           dispatch(addTodolistAC(res.data.data.item))
        })
   }
}
export const changeTodolistTitleTC = (title: string, id: string) => {
   return (dispatch: Dispatch<ActionType>) => {
      todolistsApi.updateTodolists(id, title)
        .then((res) => {
           dispatch(changeTodolistTitleAC(title, id))
        })
   }
}

// types
export type FilterValueType = `all` | `completed` | `active`
export type TodolistDomainType = TodoListType & {
   filter: FilterValueType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>


type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType