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
   const [todoListId, settodoListId] = useState<string>('')

   // useEffect(() => {
   //    let todoListId = '14ec61ee-e03c-4e6c-a042-091e04058b87'
   //    todolistsApi.getTasks(todoListId)
   //      .then((res) => {
   //         setState(res.data)
   //      })
   // }, [])

   const getTasks = () => {
      todolistsApi.getTasks(todoListId)
        .then((res) => {
           setState(res.data)
        })
   }
   return <div>
      {JSON.stringify(state)}
      <div>
         <input
           placeholder={"todolist"}
           value={todoListId}
           onChange={(e) => {
              settodoListId(e.currentTarget.value)
           }}/>

         <button onClick={getTasks}>getTasks</button>
      </div>
   </div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   const [title, settitle] = useState<string>('')
   const [todolistID, settodolistID] = useState<string>('')

   // useEffect(() => {
   //    let title = 'ТУДУ ЛИСТИК'
   //    let todolistID = '14ec61ee-e03c-4e6c-a042-091e04058b87'
   //    todolistsApi.createTasks(todolistID, title)
   //      .then((res) => {
   //         setState(res.data)
   //      })
   // }, [])

   const createTask = () => {
      todolistsApi.createTasks(todolistID, title)
        .then((res) => {
           setState(res.data)
        })
   }


   return <div>
      {JSON.stringify(state)}
      <div>
         <input
           placeholder={"todolist"}
           value={todolistID}
           onChange={(e) => {
              settodolistID(e.currentTarget.value)
           }}/>
         <input
           placeholder={"taskId"}
           value={title}
           onChange={(e) => {
              settitle(e.currentTarget.value)
           }}/>
         <button onClick={createTask}>createTask</button>
      </div>
   </div>
}


export const DeleteTask = () => {
   const [state, setState] = useState<any>(null)
   const [taskId, setTaskId] = useState<string>('')
   const [todolistID, settodolistID] = useState<string>('')

   const deleteTask = () => {
      todolistsApi.deliteTask(todolistID, taskId)
        .then((res) => {
           setState(res.data)
        })
   }

   // useEffect(() => {
   //    let todolistId = '14ec61ee-e03c-4e6c-a042-091e04058b87';
   //    let taskId = '20b07c66-9aa6-4296-9e9a-f546f55f2f6d'
   //    todolistsApi.deliteTask(todolistId, taskId)
   //      .then((res) => {
   //         setState(res.data)
   //      })
   // }, [])

   return <div>
      {JSON.stringify(state)}
      <div>
         <input
           placeholder={"todolist"}
           value={todolistID}
           onChange={(e) => {
              settodolistID(e.currentTarget.value)
           }}/>
         <input
           placeholder={"taskId"}
           value={taskId}
           onChange={(e) => {
              setTaskId(e.currentTarget.value)
           }}/>
         <button onClick={deleteTask}>delet</button>
      </div>
   </div>
}
export const UpdateTask = () => {
   const [state, setState] = useState<any>(null)
   const [title, settitle] = useState<string>('')
   const [description, setdescription] = useState<string>('')
   const [completed, setcompleted] = useState<number>(0)
   const [status, setstatus] = useState<number>(0)
   const [priority, setpriority] = useState<number>(0)
   const [startDate, setstartDate] = useState<string>('')
   const [deadline, setdeadline] = useState<string>('')


   const [todolistId, settodolistId] = useState<string>('')
   const [taskId, settaskId] = useState<string>('')


   // useEffect(() => {
   //    let todolistId = '14ec61ee-e03c-4e6c-a042-091e04058b87';
   //    let taskId = '20b07c66-9aa6-4296-9e9a-f546f55f2f6d'
   //    let title = 'ПОМЕНЯЛИ ЛИСТИК'
   //    todolistsApi.updateTask(todolistId, taskId, title)
   //      .then((res) => {
   //         setState(res.data)
   //      })
   //
   // }, [])


   const createTask = () => {
      todolistsApi.updateTask(todolistId, taskId, {
         title: title,
         description: description,
         completed: completed,
         status: status,
         priority: priority,
         startDate: startDate,
         deadline: deadline,
      })
        .then((res) => {
           setState(res.data)
        })
   }

   return <div>
      {JSON.stringify(state)}
      <div>
         <input placeholder={"todolist"} value={todolistId} onChange={(e) => {
            settodolistId(e.currentTarget.value)
         }}/>
         <input placeholder={"taskId"} value={taskId} onChange={(e) => {
            settaskId(e.currentTarget.value)
         }}/>
         <input placeholder={"task title"} value={title} onChange={(e) => {
            settitle(e.currentTarget.value)
         }}/>
         <input placeholder={"description"} value={description} onChange={(e) => {
            setdescription(e.currentTarget.value)
         }}/>
         <input placeholder={"completed"} value={completed} onChange={(e) => {
            setcompleted(+e.currentTarget.value)
         }}/>
         <input placeholder={"status"} value={status} onChange={(e) => {
            setstatus(+e.currentTarget.value)
         }}/>
         <input placeholder={"priority"} value={priority} onChange={(e) => {
            setpriority(+e.currentTarget.value)
         }}/>
         <input placeholder={"startDate"} value={startDate} onChange={(e) => {
            setstartDate(e.currentTarget.value)
         }}/>
         <input placeholder={"deadline"} value={deadline} onChange={(e) => {
            setdeadline(e.currentTarget.value)
         }}/>
         <button onClick={createTask}>delet</button>
      </div>
   </div>
}