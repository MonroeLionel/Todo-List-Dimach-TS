import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
   removeTasks: (id: string, todoListId: string) => void
   changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
   tasks: TaskType
   todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {

   const onRemuveHandler = () => {
      props.removeTasks(props.tasks.id, props.todolistID)
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.currentTarget.checked
      props.changeTaskStatus(props.tasks.id, newValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
   }
   const onChangeTitleHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.tasks.id, newValue, props.todolistID)
   }, [props.tasks.id, props.changeTaskTitle, props.todolistID])


   return (
     <div className={props.tasks.status === TaskStatuses.Completed ? "is-done" : ""} key={props.tasks.id}>

        <Checkbox

          checked={props.tasks.status === TaskStatuses.Completed}
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