import axios from "axios";

const settings = {

   withCredentials: true,
   headers: {
      "API-KEY": "3d23276c-ddcb-4cb6-9813-101eaaffca9c"
   }
}

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings
})

export type TodoListType = {
   id: string
   title: string
   addedDate: string
   order: number
}

type ResponseType<D = {}> = {
   resultCode: number
   messages: Array<string>
   data: D
}

type TasksReasponse = {
   error: string | null
   totalCount: number
   items: TaskType[]
}
type TaskType = {
   description: string
   title: string
   completed: boolean
   status: number
   priority: number
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string

}

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
      return instance.post(`todo-lists/${todoListId}/tasks`, {title})
   },
   deliteTask(todolistId: string, taskId: string) {
      const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
      return promise
   },
   updateTask(todolistId: string, taskId: string, title: string) {
      const promise = instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
      return promise
   },
}