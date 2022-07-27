import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddIdemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TuduListPropsType = {
   title: string
   title2?: boolean
   tasks1: Array<tasks1PropsType>
   removeTasks: (id: string, todoListId: string) => void
   changeFilter: (value: FilterValueType, todoListId: string) => void
   addTask: (title: string, todoListId: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
   filter: FilterValueType
   tlID: string
   removeTuduList: (todoListId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
   ChangeTuduListTitle: (newTitle: string, id: string) => void
}
export type tasks1PropsType = {
   id: string,
   title: string,
   isDone: boolean
}

export function TuduList(props: TuduListPropsType) {
   const filterAll = () => {
      props.changeFilter(`all`, props.tlID)
   }
   const filterActive = () => {

      props.changeFilter(`active`, props.tlID)

   }
   const filterCompleted = () => {

      props.changeFilter(`completed`, props.tlID)

   }
   const removeTuduList = () => {
      props.removeTuduList(props.tlID)
   }

   const addTask = (title: string) => {
      props.addTask(title, props.tlID)
   }

   const onChangeTuduListTitleHandler = (value: string) => {
      props.ChangeTuduListTitle(value, props.tlID)
   }
   return (
     <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTuduListTitleHandler}/>

           {/*<button onClick={removeTuduList}>x</button>*/}
           <IconButton onClick={removeTuduList}><Delete/></IconButton>
        </h3>
        <h3>{props.title2}</h3>
        <AddItemForm addItem={addTask}/>
        <ul>
           {/*MAP это метод массива который на основе каждого объекта в массиве создает*/}
           {/*какой то другой элемент*/}
           {/*на выходе мы получаем новый массив с этими новыми элементами*/}
           {props.tasks1.map(el => {
              const onRemuveHandler = () => {
                 props.removeTasks(el.id, props.tlID)
              }
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                 props.changeTaskStatus(el.id, e.currentTarget.checked, props.tlID)
                 // console.log(el.id + `qwe` + e.currentTarget.checked)
              }
              const onChangeTitleHandler = (newValue: string) => {
                 props.changeTaskTitle(el.id, newValue, props.tlID)
              }
              return (
                <div className={el.isDone ? "is-done" : ""} key={el.id}>
                   {/*<input*/}
                   {/*  type="checkbox"*/}
                   {/*  checked={el.isDone}*/}
                   {/*  onChange={onChangeHandler}*/}
                   {/*/>*/}
                   <Checkbox

                     checked={el.isDone}
                     onChange={onChangeHandler}
                   />
                   <EditableSpan
                     title={el.title}
                     onChange={onChangeTitleHandler}
                   />
                   {/*<button onClick={onRemuveHandler}>x*/}
                   {/*</button>*/}
                   <IconButton onClick={onRemuveHandler}><Delete/></IconButton>
                </div>

              )
           })}


        </ul>
        <div>
           {/*<button*/}
           {/*  className={props.filter === "all" ? "active-filter" : ""}*/}
           {/*  onClick={filterAll}*/}
           {/*>All*/}
           {/*</button>*/}
           {/*<button*/}
           {/*  className={props.filter === "active" ? "active-filter" : ""}*/}
           {/*  onClick={filterActive}*/}
           {/*>Active*/}
           {/*</button>*/}
           {/*<button*/}
           {/*  className={props.filter === "completed" ? "active-filter" : ""}*/}
           {/*  onClick={filterCompleted}*/}
           {/*>Completed*/}
           {/*</button>*/}

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
}

