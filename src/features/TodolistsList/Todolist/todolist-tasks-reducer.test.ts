import {TaskStateType} from "../../../trash/App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./task-reducer";
import {TodoListType} from "../../../api/todolists-api";

test("ids should be equals", () => {
   const startTasksState: TaskStateType = {}
   const startTodolostsState: Array<TodolistDomainType> = []

   let newTodoListTitle: TodoListType = {
      title: "new todolist",
      id: '',
      addedDate: '',
      order: 0
   }

   const action = addTodolistAC(newTodoListTitle)

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolostsState, action)

   const keys = Object.keys(endTasksState)
   const idFromTasks = keys[0]
   const idFromTodolists = endTodolistsState[0].id

   expect(idFromTasks).toBe(action.todolist.id)
   expect(idFromTodolists).toBe(action.todolist.id)

})