import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
   addItem: (title: string) => void
   
}

export function AddItemForm(props: AddItemFormPropsType) {
   const [newTaskTitle, setNewTaskTitle] = useState(``)
   const [error, setError] = useState<string | null>(null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)

   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         props.addItem(newTaskTitle)
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
      props.addItem(newTaskTitle.trim())
      setNewTaskTitle(``)

   }
   return (
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
        }
     </div>
   )
}