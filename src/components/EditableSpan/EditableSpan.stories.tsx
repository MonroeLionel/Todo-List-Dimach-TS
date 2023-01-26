import React from "react";
import {AddItemForm} from "../AddItemForm/AddIdemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../../features/TodolistsList/Todolist/Task/Task";
import {EditableSpan} from "./EditableSpan";

export default {
   title: 'EditableSpan component',
   component: EditableSpan
}

const changeCallback = action("value change")


export const EditableSpanBaseExample = () => {
   return <EditableSpan title={"Start Value"} onChange={changeCallback}/>
}