import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from "react";
import {FilterValueType} from "./App";

type TuduListPropsType = {
   title: string
   title2?: boolean
   tasks1: Array<tasks1PropsType>
   removeTasks: (id: string) => void
   changeFilter: (value: FilterValueType) => void
   addTask: (title: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean) => void
   filter: FilterValueType

}
export type tasks1PropsType = {
   id: string,
   title: string,
   isDone: boolean
}

export function TuduList(props: TuduListPropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState(``)
   const [error, setError] = useState<string | null>(null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)

   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         props.addTask(newTaskTitle)
         setNewTaskTitle(``)

      }
      setError(null)

   }
   const addTask = () => {
      //trim отсекает пробелы
      if (newTaskTitle.trim() === ``) {
         setError("Field is required")
         return;
      }
      props.addTask(newTaskTitle.trim())
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
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
           />
           <button onClick={addTask}>+
           </button>
           {error && <div className="error-message">{error}</div>
           }        </div>
        <ul>
           {/*MAP это метод массива который на основе каждого объекта в массиве создает*/}
           {/*какой то другой элемент*/}
           {/*на выходе мы получаем новый массив с этими новыми элементами*/}
           {props.tasks1.map(el => {
              const onRemuveHandler = () => {
                 props.removeTasks(el.id)
              }
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                 props.changeTaskStatus(el.id, e.currentTarget.checked)
                 // console.log(el.id + `qwe` + e.currentTarget.checked)
              }
              return (
                <li className={el.isDone ? "is-done" : ""} key={el.id}>
                   <input
                     type="checkbox"
                     checked={el.isDone}
                     onChange={onChangeHandler}
                   />
                   <span>{el.title}</span>
                   <button onClick={onRemuveHandler}>x
                   </button>
                </li>

              )
           })}


        </ul>
        <div>
           <button
             className={props.filter === "all" ? "active-filter" : ""}
             onClick={filterAll}
           >All
           </button>
           <button
             className={props.filter === "active" ? "active-filter" : ""}
             onClick={filterActive}
           >Active
           </button>
           <button
             className={props.filter === "completed" ? "active-filter" : ""}
             onClick={filterCompleted}
           >Completed
           </button>
        </div>
     </div>
   )
}