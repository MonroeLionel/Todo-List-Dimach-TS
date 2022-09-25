import React from "react";
import {AddItemForm} from "./AddIdemForm";
import {action} from "@storybook/addon-actions";

export default {
   title: 'AddItem Form component',
   component: AddItemForm
}

const callBack = action("Кнопка нажата")

export const addItemFormBaseExample = () => {
   return <AddItemForm addItem={callBack}/>
}