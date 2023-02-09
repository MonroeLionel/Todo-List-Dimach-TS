const initialState: InitialStateType = {
   status: "idle",
   error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS':
         return {...state, status: action.status}
      case 'APP/SET-ERROR':
         return {...state, error: action.error}
      default:
         return {...state}
   }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type InitialStateType = {
   // происходит ли сейчас взаимодействи с сервером
   status: RequestStatusType
   error: string | null
}

export type setErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionType =
  | setErrorActionType
  | setStatusActionType