import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "../features/TodolistsList/Todolist/todolist-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/task-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/TodolistsList/Login/auth-reducer";

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer

})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>
//@ts-ignore
window.store = store