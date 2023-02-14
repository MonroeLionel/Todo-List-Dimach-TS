import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC, setIsLoggedInActionType} from "../features/TodolistsList/Login/auth-reducer";

const initialState: InitialStateType = {
   status: "idle",
   error: null,
   isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS':
         return {...state, status: action.status}
      case 'APP/SET-ERROR':
         return {...state, error: action.error}
      case "APP/SET-IS-INITIALIZED": {
         return {...state, isInitialized: action.value}
      }
      default:
         return {...state}
   }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type InitialStateType = {
   // происходит ли сейчас взаимодействи с сервером
   status: RequestStatusType
   error: string | null
   //true когда приложение проинициализировалось
   isInitialized: boolean
}

export const initializedAppTC = (dispatch: Dispatch<ActionType>) => {
   authAPI.me()
     .then(res => {
        if (res.data.resultCode === 0) {
           dispatch(setIsLoggedInAC(true))
        } else {

        }
        dispatch(setAppInitializedAC(true))

     })
}

export type setErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionType =
  | setErrorActionType
  | setStatusActionType
  | ReturnType<typeof setAppInitializedAC>
  | setIsLoggedInActionType