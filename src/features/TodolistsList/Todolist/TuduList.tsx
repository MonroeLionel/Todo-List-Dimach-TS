import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddIdemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValueType, TodolistDomainType} from "./todolist-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./task-reducer";

export type TuduListPropsType = {
   todolist: TodolistDomainType
   title2?: boolean
   tasks1: Array<TaskType>
   changeFilter: (value: FilterValueType, todoListId: string) => void
   addTask: (title: string, todoListId: string) => void
   removeTuduList: (todoListId: string) => void
   removeTasks: (id: string, todoListId: string) => void
   changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
   ChangeTuduListTitle: (newTitle: string, id: string) => void
}


export const TuduList = React.memo(function (props: TuduListPropsType) {
   console.log("TuduList")
   const dispatch = useDispatch()
   useEffect(() => {

      // @ts-ignore
      dispatch(fetchTasksTC(props.todolist.id))
   }, [])

   const filterAll = useCallback(() => {
      props.changeFilter(`all`, props.todolist.id)
   }, [props.changeFilter, props.todolist.id])
   const filterActive = useCallback(() => {

      props.changeFilter(`active`, props.todolist.id)
   }, [props.changeFilter, props.todolist.id])
   const filterCompleted = useCallback(() => {

      props.changeFilter(`completed`, props.todolist.id)

   }, [props.changeFilter, props.todolist.id])


   const removeTuduList = () => {
      props.removeTuduList(props.todolist.id)
   }

   const addTask = useCallback((title: string) => {
      props.addTask(title, props.todolist.id)
   }, [props.addTask, props.todolist.id])

   const onChangeTuduListTitleHandler = useCallback((value: string) => {
      props.ChangeTuduListTitle(value, props.todolist.id)
   }, [props.todolist.id, props.ChangeTuduListTitle])

   let taskForTodolist = props.tasks1
   if (props.todolist.filter === `completed`) {
      taskForTodolist = props.tasks1.filter(el => el.status === TaskStatuses.Completed)
   }
   if (props.todolist.filter === `active`) {
      taskForTodolist = props.tasks1.filter(el => el.status === TaskStatuses.New)
   }

   return (
     <div>
        <h3><EditableSpan title={props.todolist.title} onChange={onChangeTuduListTitleHandler}/>

           <IconButton onClick={removeTuduList}
                       disabled={props.todolist.entityStatus === "loading"}><Delete/></IconButton>
        </h3>
        <h3>{props.title2}</h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
        <ul>
           {props.tasks1.map(el => <Task
             tasks={el}
             changeTaskStatus={props.changeTaskStatus}
             removeTasks={props.removeTasks}
             changeTaskTitle={props.changeTaskTitle}
             todolistID={props.todolist.id}
             key={el.id}
           />)
           }


        </ul>
        <div>
           <Button variant={props.todolist.filter === "all" ? "contained" : "text"}
                   onClick={filterAll}
           >All
           </Button>
           <Button variant={props.todolist.filter === "active" ? "contained" : "text"}
                   color={"primary"}
                   onClick={filterActive}
           >Active
           </Button>
           <Button variant={props.todolist.filter === "completed" ? "contained" : "text"}
                   color={"secondary"}

                   onClick={filterCompleted}
           >Completed
           </Button>
        </div>
     </div>
   )
})

