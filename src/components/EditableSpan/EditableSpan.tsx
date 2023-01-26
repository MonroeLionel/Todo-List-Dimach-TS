import React, {ChangeEvent, useMemo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
   title: string
   onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
   console.log("EditableSpan")
   let [editMode, setEditMode] = useState<boolean>(false)
   let [title, setTitle] = useState("")
   const activateEditMode = () => {
      setEditMode(true)
      setTitle(props.title)
   }

   const activateViewMode = () => {
      setEditMode(false)
      props.onChange(title)
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
   return editMode
     ? <TextField
       autoFocus={true}
       onBlur={activateViewMode}
       value={title}
       onChange={onChangeHandler}
     ></TextField>
     : <span onDoubleClick={activateEditMode}>{props.title}</span>
})