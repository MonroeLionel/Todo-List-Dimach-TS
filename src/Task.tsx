import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {tasks1PropsType} from "./TuduList";

type TaskPropsType = {
   removeTasks: (id: string, todoListId: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
   tasks: tasks1PropsType
   todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {

   const onRemuveHandler = () => {
      props.removeTasks(props.tasks.id, props.todolistID)
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(props.tasks.id, e.currentTarget.checked, props.todolistID)
      // console.log(el.id + `qwe` + e.currentTarget.checked)
   }
   const onChangeTitleHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.tasks.id, newValue, props.todolistID)
   }, [props.tasks.id, props.changeTaskTitle, props.todolistID])


   return (
     <div className={props.tasks.isDone ? "is-done" : ""} key={props.tasks.id}>

        <Checkbox

          checked={props.tasks.isDone}
          onChange={onChangeHandler}
        />
        <EditableSpan
          title={props.tasks.title}
          onChange={onChangeTitleHandler}
        />

        <IconButton onClick={onRemuveHandler}><Delete/></IconButton>
     </div>

   )
})