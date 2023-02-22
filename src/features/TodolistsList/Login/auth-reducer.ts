import {setAppStatusAC, setErrorActionType, setStatusActionType} from "../../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utilst";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
   isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
   switch (action.type) {
      case "login/SET-IS-LOGGED-IN": {
         return {...state, isLoggedIn: action.value}
      }
      default:
         return state
   }
}

// actions
export const setIsLoggedInAC = (value: boolean) => {
   return {type: "login/SET-IS-LOGGED-IN", value} as const
}


// thunks
export const loginTC = (data: LoginParamsType) => {
   return (dispatch: Dispatch<ActionType>) => {
      dispatch(setAppStatusAC("loading"))
      authAPI.login(data)

        .then((res) => {
           if (res.data.resultCode === 0) {
              dispatch(setIsLoggedInAC(true))
              dispatch(setAppStatusAC("succeed"))
           } else {
              handleServerAppError(res.data, dispatch)
           }
        })
        .catch((error) => {
           handleServerNetworkError(error, dispatch)
        })
   }
}
export const logoutTC = () => {
   return (dispatch: Dispatch<ActionType>) => {
      dispatch(setAppStatusAC("loading"))
      authAPI.logout()

        .then((res) => {
           if (res.data.resultCode === 0) {
              dispatch(setIsLoggedInAC(false))
              dispatch(setAppStatusAC("succeed"))
           } else {
              handleServerAppError(res.data, dispatch)
           }
        })
        .catch((error) => {
           handleServerNetworkError(error, dispatch)
        })
   }
}

// types
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

type ActionType =
  | setErrorActionType
  | setStatusActionType
  | setIsLoggedInActionType


type InitialStateType = {
   isLoggedIn: boolean
}

