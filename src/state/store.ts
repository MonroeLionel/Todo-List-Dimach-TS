import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./task-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store