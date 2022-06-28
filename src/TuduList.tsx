import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from "react";
import {FilterValueType} from "./App";

type TuduListPropsType = {
   title: string
   title2?: boolean
   tasks1: Array<tasks1PropsType>
   removeTasks: (id: string) => void
   changeFilter: (value: FilterValueType) => void
   addTask: (title: string) => void
}
export type tasks1PropsType = {
   id: string,
   title: string,
   isDone: boolean
}

export function TuduList(props: TuduListPropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState(``)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         props.addTask(newTaskTitle)
         setNewTaskTitle(``)
      }
   }
   const addTask = () => {
      props.addTask(newTaskTitle)
      setNewTaskTitle(``)
   }
   const filterAll = () => {
      props.changeFilter(`all`)
   }
   const filterActive = () => {

      props.changeFilter(`active`)

   }
   const filterCompleted = () => {

      props.changeFilter(`completed`)

   }
   return (
     <div>
        <h3>{props.title}</h3>
        <h3>{props.title2}</h3>
        <div>
           <input
             value={newTaskTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}/>
           <button onClick={addTask}>+
           </button>
        </div>
        <ul>
           {/*MAP это метод массива который на основе каждого объекта в массиве создает*/}
           {/*какой то другой элемент*/}
           {/*на выходе мы получаем новый массив с этими новыми элементами*/}
           {props.tasks1.map(el => {
              const onRemuveHandler = () => {

                 props.removeTasks(el.id)

              }
              return (
                <li key={el.id}>
                   <input type="checkbox" checked={el.isDone}/>
                   <span>{el.title}</span>
                   <button onClick={onRemuveHandler}>x
                   </button>
                </li>

              )
           })}


        </ul>
        <div>
           <button onClick={filterAll}>All</button>
           <button onClick={filterActive}>Active</button>
           <button onClick={filterCompleted}>Completed</button>
        </div>
     </div>
   )
}