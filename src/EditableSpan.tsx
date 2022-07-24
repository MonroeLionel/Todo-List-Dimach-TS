import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
   title: string
   onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
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
     ? <input
       autoFocus={true}
       onBlur={activateViewMode}
       value={title}
       onChange={onChangeHandler}
     ></input>
     : <span onDoubleClick={activateEditMode}>{props.title}</span>
}