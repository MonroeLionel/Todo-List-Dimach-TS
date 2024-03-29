import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
   addItem: (title: string) => void
   disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
   console.log("AddItemForm")
   const [newTaskTitle, setNewTaskTitle] = useState(``)
   const [error, setError] = useState<string | null>(null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)

   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.charCode === 13) {
         addItem(newTaskTitle)
         setNewTaskTitle(``)

      }


   }

   const addTask = () => {
      //trim отсекает пробелы
      if (newTaskTitle.trim() === ``) {
         setError("Field is required")
         return;
      }
      addItem(newTaskTitle.trim())
      setNewTaskTitle(``)

   }
   return (
     <div>
        {/*<input*/}
        {/*  value={newTaskTitle}*/}
        {/*  onChange={onChangeHandler}*/}
        {/*  onKeyPress={onKeyPressHandler}*/}
        {/*  className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField
          disabled={disabled}
          variant={"outlined"}
          label={'Type value'}
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          error={!!error}
          helperText={error}
        />
        {/*<button onClick={addTask}>+*/}
        {/*</button>*/}
        <IconButton onClick={addTask} color={"primary"} disabled={disabled}><ControlPoint/></IconButton>

        {/*{error && <div className="error-message">{error}</div>*/}
        {/*}*/}
     </div>
   )
})