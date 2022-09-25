import React from "react";
import {AddItemForm} from "./AddIdemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
   title: 'Task component',
   component: Task
}

const changeTaskStatuscallBack = action("status changet")
const changeTaskTitlecallBack = action("title changet")
const removeTaskscallBack = action("task Removt")

export const TaskBaseExample = () => {
   return <>
      <Task
        tasks={{id: "1", isDone: true, title: "CSS"}}
        changeTaskStatus={changeTaskStatuscallBack}
        removeTasks={removeTaskscallBack}
        changeTaskTitle={changeTaskTitlecallBack}
        todolistID={"todoListId1"}
      />
      <Task
        tasks={{id: "2", isDone: false, title: "React"}}
        changeTaskStatus={changeTaskStatuscallBack}
        removeTasks={removeTaskscallBack}
        changeTaskTitle={changeTaskTitlecallBack}
        todolistID={"todoListId2"}
      />
   </>
}