import React, {useCallback} from "react";
import {AddItemForm} from "./AddIdemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValueType} from "./state/todolist-reducer";

export type TuduListPropsType = {
   title: string
   title2?: boolean
   tasks1: Array<TaskType>
   changeFilter: (value: FilterValueType, todoListId: string) => void
   addTask: (title: string, todoListId: string) => void
   filter: FilterValueType
   tlID: string
   removeTuduList: (todoListId: string) => void
   removeTasks: (id: string, todoListId: string) => void
   changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
   ChangeTuduListTitle: (newTitle: string, id: string) => void
}


export const TuduList = React.memo(function (props: TuduListPropsType) {
   console.log("TuduList")
   const filterAll = useCallback(() => {
      props.changeFilter(`all`, props.tlID)
   }, [props.changeFilter, props.tlID])
   const filterActive = useCallback(() => {

      props.changeFilter(`active`, props.tlID)
   }, [props.changeFilter, props.tlID])
   const filterCompleted = useCallback(() => {

      props.changeFilter(`completed`, props.tlID)

   }, [props.changeFilter, props.tlID])


   const removeTuduList = () => {
      props.removeTuduList(props.tlID)
   }

   const addTask = useCallback((title: string) => {
      props.addTask(title, props.tlID)
   }, [props.addTask, props.tlID])

   const onChangeTuduListTitleHandler = useCallback((value: string) => {
      props.ChangeTuduListTitle(value, props.tlID)
   }, [props.tlID, props.ChangeTuduListTitle])

   let taskForTodolist = props.tasks1
   if (props.filter === `completed`) {
      taskForTodolist = props.tasks1.filter(el => el.status === TaskStatuses.Completed)
   }
   if (props.filter === `active`) {
      taskForTodolist = props.tasks1.filter(el => el.status === TaskStatuses.New)
   }

   return (
     <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTuduListTitleHandler}/>

           <IconButton onClick={removeTuduList}><Delete/></IconButton>
        </h3>
        <h3>{props.title2}</h3>
        <AddItemForm addItem={addTask}/>
        <ul>
           {/*MAP это метод массива который на основе каждого объекта в массиве создает*/}
           {/*какой то другой элемент*/}
           {/*на выходе мы получаем новый массив с этими новыми элементами*/}
           {props.tasks1.map(el => <Task
             tasks={el}
             changeTaskStatus={props.changeTaskStatus}
             removeTasks={props.removeTasks}
             changeTaskTitle={props.changeTaskTitle}
             todolistID={props.tlID}
             key={el.id}
           />)
           }


        </ul>
        <div>
           <Button variant={props.filter === "all" ? "contained" : "text"}
                   onClick={filterAll}
           >All
           </Button>
           <Button variant={props.filter === "active" ? "contained" : "text"}
                   color={"primary"}
                   onClick={filterActive}
           >Active
           </Button>
           <Button variant={props.filter === "completed" ? "contained" : "text"}
                   color={"secondary"}

                   onClick={filterCompleted}
           >Completed
           </Button>
        </div>
     </div>
   )
})

