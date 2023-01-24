import {TaskStateType} from "../App";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer} from "./task-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolists-api";

let startState: TaskStateType = {}
beforeEach(() => {
   startState = {
      "todoListId1": [
         {
            id: "1", title: "HTML&CSS", status: TaskStatuses.Completed,
            todoListId: "todoListId1",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
         {
            id: "2", title: "JS", status: TaskStatuses.Completed,
            todoListId: "todoListId1",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
         {
            id: "3", title: "ReactJS", status: TaskStatuses.New,
            todoListId: "todoListId1",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
      ],
      "todoListId2": [
         {
            id: "1", title: "book", status: TaskStatuses.Completed,
            todoListId: "todoListId2",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
         {
            id: "2", title: "milk", status: TaskStatuses.Completed,
            todoListId: "todoListId2",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
         {
            id: "3", title: "tea", status: TaskStatuses.New,
            todoListId: "todoListId2",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
            description: '',
         },
      ],
   }
})
test("таска удалеа из массива", () => {


   const action = removeTaskAC("todoListId2", "2")

   const endState = tasksReducer(startState, action)

   expect(endState["todoListId1"].length).toBe(3)
   expect(endState["todoListId2"].length).toBe(2)
   expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy()
   //ever как МАР или FILTER пробегается по каждому элементу массива
})


test("добавления таски", () => {


   // const action = addTaskAC("todoListId2", "juce")
   const action = addTaskAC({
      todoListId: "todoListId2",
      title: "juce",
      status: TaskStatuses.New,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: 0,
      startDate: "",
      completed: false,
      id: "id exists",
   })

   const endState = tasksReducer(startState, action)

   expect(endState["todoListId1"].length).toBe(3)
   expect(endState["todoListId2"].length).toBe(4)
   expect(endState["todoListId2"][0].id).toBeDefined()
   expect(endState["todoListId2"][0].title).toBe("juce")
   expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New)
   //ever как МАР или FILTER пробегается по каждому элементу массива
})


test("изменения статуса определенной таски", () => {


   const action = updateTaskAC("todoListId2", "2", TaskStatuses.New)

   const endState = tasksReducer(startState, action)

   expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed)
   expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New)

   //ever как МАР или FILTER пробегается по каждому элементу массива
})


test("изменения названия таски", () => {


   const action = changeTaskTitleAC("todoListId2", "2", "Milkiway")

   const endState = tasksReducer(startState, action)

   expect(endState["todoListId2"][1].title).toBe("Milkiway")
   expect(endState["todoListId1"][1].title).toBe("JS")

   //ever как МАР или FILTER пробегается по каждому элементу массива
})

test("добавляем туду лист", () => {


   const action = addTodolistAC("New TuduList")
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)
   const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
   if (!newKey) {
      throw Error("new key should be added")
   }

   expect(keys.length).toBe(3)
   expect(endState[newKey]).toEqual([])

   //ever как МАР или FILTER пробегается по каждому элементу массива
})

test("удаляем тудулист", () => {


   const action = removeTodolistAC("todoListId2")
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState["todoListId2"]).toBeUndefined()

   //ever как МАР или FILTER пробегается по каждому элементу массива
})


test("пустые массивы должны быть добавленны когда мы сетаем туду листы", () => {

   const action = setTasksAC(startState["todoListId1"], "todoListId1")

   const endState = tasksReducer({
      "todoListId2": [],
      "todoListId1": []

   }, action)

   expect(endState["todoListId1"].length).toBe(3)
   expect(endState["todoListId2"].length).toBe(0)


})