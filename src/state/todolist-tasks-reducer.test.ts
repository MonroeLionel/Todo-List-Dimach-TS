import {TaskStateType, TodoListType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./task-reducer";

test("ids should be equals", () => {
   const startTasksState: TaskStateType = {}
   const startTodolostsState: Array<TodoListType> = []

   const action = addTodolistAC("new todolist")

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolostsState, action)

   const keys = Object.keys(endTasksState)
   const idFromTasks = keys[0]
   const idFromTodolists = endTodolistsState[0].id

   expect(idFromTasks).toBe(action.todolistID)
   expect(idFromTodolists).toBe(action.todolistID)

})