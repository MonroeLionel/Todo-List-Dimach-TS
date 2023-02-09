import axios from "axios";

const settings = {

   withCredentials: true,
   headers: {
      "API-KEY": "aebee15d-a8e4-471a-aaa5-f2699dbc0080"
   }
}

const instance = axios.create({

   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings
})

// api
export const todolistsApi = {
   getTodolists() {
      const promise = instance.get<Array<TodoListType>>(`todo-lists`)
      return promise
   },
   createTodolists(title: string) {
      const promise = instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
      return promise
   },
   deliteTodolists(todolistId: string) {
      const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
      return promise
   },
   updateTodolists(todolistId: string, title: string) {
      const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
      return promise
   },

   getTasks(todoListId: string) {
      return instance.get<TasksReasponse>(`todo-lists/${todoListId}/tasks`)
   },
   createTasks(todoListId: string, title: string) {
      return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title})
   },
   deliteTask(todolistId: string, taskId: string) {
      const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
      return promise
   },
   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      const promise = instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
      return promise
   },
}

// type

export type TodoListType = {
   id: string
   title: string
   addedDate: string
   order: number
}
export type ResponseType<D = {}> = {
   resultCode: number
   messages: Array<string>
   data: D
}
type TasksReasponse = {
   error: string | null
   totalCount: number
   items: TaskType[]
}

export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}

export enum TodoTaskPriorities {
   Low,
   Middle,
   Hi,
   Urgently,
   Later,
}

export type TaskType = {
   description: string
   title: string
   status: TaskStatuses
   priority: TodoTaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string

}
export type UpdateTaskModelType = {
   title: string
   description: string
   status: TaskStatuses
   priority: TodoTaskPriorities
   startDate: string
   deadline: string
}