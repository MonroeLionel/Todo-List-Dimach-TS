import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";
import {
   addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
   ChengeTodolistFilterActionType,
   ChengeTodolistTitleActionType,
   removeTodolistAC,
   todolistsReducer
} from "./todolist-reducer";

test('correct todolist chould be remove', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   const startState: Array<TodoListType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ]

   /* const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todoListId1})*/
   const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newTodoListTitle = "New Todolist"

   const startState: Array<TodoListType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ]

   const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))

   expect(endState.length).toBe(3)
   expect(endState[2].title).toBe(newTodoListTitle)
   expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newTodoListTitle = "New Todolist"

   const startState: Array<TodoListType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ]

   const action: ChengeTodolistTitleActionType = {
      type: "CHANGE-TODOLIST-TITLE",
      id: todoListId2,
      title: newTodoListTitle
   }

   const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodoListTitle, todoListId2))

   expect(endState[0].title).toBe("What to learn")
   expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist could be change', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newFilter: FilterValueType = "completed";

   const startState: Array<TodoListType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ]

   const action: ChengeTodolistFilterActionType = {
      type: "CHANGE-TODOLIST-FILTER",
      id: todoListId2,
      filter: newFilter
   }

   const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todoListId2))

   expect(endState[0].filter).toBe("active")
   expect(endState[1].filter).toBe(newFilter)
})