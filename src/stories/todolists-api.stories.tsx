import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi, TodoListType} from "../api/todolists-api";

export default {
   title: 'API'

}

const settings = {

   withCredentials: true,
   headers: {
      "API-KEY": "3d23276c-ddcb-4cb6-9813-101eaaffca9c"
   }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsApi.getTodolists()
        .then((res) => {
           setState(res.data)
        })
   }, [])
   return <div>
      {JSON.stringify(state)}

   </div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)

   useEffect(() => {
      let title = 'заголовок туду листа'
      todolistsApi.createTodolists(title)
        .then((res) => {
           setState(res.data)
        })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      let todolistId = '4e126f48-476d-4302-ac60-7585160c1d73';
      todolistsApi.deliteTodolists(todolistId)
        .then((res) => {
           setState(res.data)
        })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      let todolistId = '9faa953c-5083-4f97-96d1-620ba7c0e18c';
      let title = 'заголовок туду листа'
      todolistsApi.updateTodolists(todolistId, title)
        .then((res) => {
           setState(res.data)
        })

   }, [])

   return <div>
      {JSON.stringify(state)}


   </div>
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null)

   useEffect(() => {
      let todoListId = '14ec61ee-e03c-4e6c-a042-091e04058b87'
      todolistsApi.getTasks(todoListId)
        .then((res) => {
           setState(res.data)
        })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)

   useEffect(() => {
      let title = 'ТУДУ ЛИСТИК'
      let todolistID = '14ec61ee-e03c-4e6c-a042-091e04058b87'
      todolistsApi.createTasks(todolistID, title)
        .then((res) => {
           setState(res.data)
        })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}


export const DeleteTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      let todolistId = '14ec61ee-e03c-4e6c-a042-091e04058b87';
      let taskId = '20b07c66-9aa6-4296-9e9a-f546f55f2f6d'
      todolistsApi.deliteTask(todolistId, taskId)
        .then((res) => {
           setState(res.data)
        })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      let todolistId = '14ec61ee-e03c-4e6c-a042-091e04058b87';
      let taskId = '20b07c66-9aa6-4296-9e9a-f546f55f2f6d'
      let title = 'ПОМЕНЯЛИ ЛИСТИК'
      todolistsApi.updateTask(todolistId, taskId, title)
        .then((res) => {
           setState(res.data)
        })

   }, [])

   return <div>{JSON.stringify(state)}</div>
}