import {v1} from "uuid";
import {
   addTodolistAC, chaneTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC,

   FilterValueType,
   removeTodolistAC, SetTodolistsAC, TodolistDomainType,
   todolistsReducer
} from "./todolist-reducer";
import {TodoListType} from "../../../api/todolists-api";
import {RequestStatusType} from "../../../app/app-reducer";

let todoListId1: string
let todoListId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {

   startState = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]

})


test('correct todolist chould be remove', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   const startState: Array<TodolistDomainType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]

   /* const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todoListId1})*/
   const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newTodoListTitle: TodoListType = {
      title: "New Todolist",
      id: '',
      addedDate: '',
      order: 0
   }

   const startState: Array<TodolistDomainType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]

   const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))

   expect(endState.length).toBe(3)
   expect(endState[0].title).toBe(newTodoListTitle.title)
   expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newTodoListTitle = "New Todolist"

   const startState: Array<TodolistDomainType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]


   const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodoListTitle, todoListId2))

   expect(endState[0].title).toBe("What to learn")
   expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist could be change', () => {

   let todoListId1 = v1()
   let todoListId2 = v1()

   let newFilter: FilterValueType = "completed";

   const startState: Array<TodolistDomainType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]


   const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todoListId2))

   expect(endState[0].filter).toBe("active")
   expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {

   const action = SetTodolistsAC(startState)
   const endState = todolistsReducer([], action)

   expect(endState.length).toBe(2)
})

test('correct entity status of todolist could be change', () => {
   let todoListId1 = v1()
   let todoListId2 = v1()

   let newTodoListTitle = "New Todolist"

   const startState: Array<TodolistDomainType> = [
      {id: todoListId1, title: `What to learn`, filter: `active`, entityStatus: "idle", order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, entityStatus: "idle", order: 0, addedDate: ''},
   ]

   let newStatus: RequestStatusType = "loading";

   const action = chaneTodolistEntityStatusAC(todoListId2, newStatus)


   const endState = todolistsReducer(startState, action)

   expect(endState[0].entityStatus).toBe("idle")
   expect(endState[1].entityStatus).toBe(newStatus)
})