import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskStatuses, TodoTaskPriorities} from "../../../../api/todolists-api";

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
        tasks={{
           id: "1", status: TaskStatuses.Completed, title: "CSS",
           todoListId: "todoListId1",
           startDate: '',
           deadline: '',
           addedDate: '',
           order: 0,
           priority: TodoTaskPriorities.Low,
           description: '',
        }}
        changeTaskStatus={changeTaskStatuscallBack}
        removeTasks={removeTaskscallBack}
        changeTaskTitle={changeTaskTitlecallBack}
        todolistID={"todoListId1"}
      />
      <Task
        tasks={{
           id: "2", status: TaskStatuses.New, title: "React", todoListId: "todoListId1",
           startDate: '',
           deadline: '',
           addedDate: '',
           order: 0,
           priority: TodoTaskPriorities.Low,
           description: '',
        }}
        changeTaskStatus={changeTaskStatuscallBack}
        removeTasks={removeTaskscallBack}
        changeTaskTitle={changeTaskTitlecallBack}
        todolistID={"todoListId2"}
      />
   </>
}