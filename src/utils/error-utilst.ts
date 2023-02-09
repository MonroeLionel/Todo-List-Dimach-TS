import {setAppErrorAC, setAppStatusAC, setErrorActionType, setStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<setErrorActionType | setStatusActionType>) => {

   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC("sum error"))
   }
   dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<setErrorActionType | setStatusActionType>) => {

   dispatch(setAppErrorAC(error.message ? error.message : "some error"))
   dispatch(setAppStatusAC("failed"))
}