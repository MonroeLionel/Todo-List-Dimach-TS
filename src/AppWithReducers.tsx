import React, {useReducer, useState} from 'react';
import './App.css';
import {TuduList} from "./TuduList";
import {v1} from "uuid";
import {AddItemForm} from "./AddIdemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC, FilterValueType,
   removeTodolistAC,
   todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {TaskStatuses, TodoTaskPriorities} from "./api/todolists-api";

function AppWithReducer() {

   function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
      const action = updateTaskAC(todoListId, taskId, {status})
      dispatchTaskReducer(action)
   }

   function addTask(title: string, todoListId: string) {
      const action = addTaskAC({
         todoListId: todoListId,
         title: title,
         status: TaskStatuses.New,
         addedDate: "",
         deadline: "",
         description: "",
         order: 0,
         priority: 0,
         startDate: "",

         id: "id exists",
      })
      dispatchTaskReducer(action)
   }

   function removeTask(id: string, todoListId: string) {
      const action = removeTaskAC(todoListId, id)
      dispatchTaskReducer(action)

   }

   function changeTaskTitleHandler(taskId: string, newValue: string, todoListId: string) {
      const action = updateTaskAC(todoListId, taskId, {title: newValue})
      dispatchTaskReducer(action)

   }

   function changeFilterTask(value: FilterValueType, todoListId: string) {
      const action = changeTodolistFilterAC(value, todoListId)
      dispatchTodoListsReducer(action)
   }

   function removeTuduList(todoListId: string) {
      const action = removeTodolistAC(todoListId)
      dispatchTodoListsReducer(action)
      dispatchTaskReducer(action)
   }

   function addTodoList(title: string) {
      const action = addTodolistAC({
         id: v1(),
         addedDate: "",
         order: 0,
         title: title
      })
      dispatchTaskReducer(action)

      dispatchTodoListsReducer(action)
   }

   function ChangeTuduListTitle(newTitle: string, id: string) {
      const action = changeTodolistTitleAC(newTitle, id)
      dispatchTodoListsReducer(action)
   }

   let todoListId1 = v1()
   let todoListId2 = v1()

   let [todoList, dispatchTodoListsReducer] = useReducer(todolistsReducer, [
      {id: todoListId1, title: `What to learn`, filter: `active`, addedDate: '', order: 0},
      {id: todoListId2, title: `What to buy`, filter: `completed`, addedDate: '', order: 0},
   ])

   let [tasksObj, dispatchTaskReducer] = useReducer(tasksReducer, {
      [todoListId1]: [
         {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            description: '',
         },
         {
            id: v1(), title: "JS", status: TaskStatuses.Completed,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,

            description: '',
         },
         {
            id: v1(), title: "ReactJS", status: TaskStatuses.New,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,

            description: '',
         },
         {
            id: v1(), title: "Redax", status: TaskStatuses.New,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,

            description: '',
         }
      ],
      [todoListId2]: [
         {
            id: v1(), title: "book", status: TaskStatuses.Completed,
            todoListId: todoListId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,

            description: '',
         },
         {
            id: v1(), title: "milk", status: TaskStatuses.Completed,
            todoListId: todoListId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,

            description: '',
         },
      ],
   })


   return (
     <div className="App">
        <AppBar position={"static"}>
           <Toolbar>
              <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}> <Menu/></IconButton>
              <Typography variant={"h6"}>
                 News
              </Typography>
              <Button color={"inherit"}>Login</Button>
           </Toolbar>

        </AppBar>
        <Container fixed>
           <Grid container style={{padding: "10px"}}>
              <AddItemForm addItem={addTodoList}/>
           </Grid>
           <Grid container spacing={3}>
              {
                 todoList.map((tl) => {

                    let taskForTodolist = tasksObj[tl.id];
                    if (tl.filter === `completed`) {
                       taskForTodolist = tasksObj[tl.id].filter(el => el.status === TaskStatuses.Completed)
                    }
                    if (tl.filter === `active`) {
                       taskForTodolist = tasksObj[tl.id].filter(el => el.status === TaskStatuses.New)
                    }

                    return <Grid item>
                       <Paper style={{padding: "10px"}}>
                          <TuduList
                            ChangeTuduListTitle={ChangeTuduListTitle}
                            changeTaskTitle={changeTaskTitleHandler}
                            removeTuduList={removeTuduList}
                            key={tl.id}
                            tlID={tl.id}
                            title={tl.title}
                            tasks1={taskForTodolist}
                            removeTasks={removeTask}
                            changeFilter={changeFilterTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                          />
                       </Paper>
                    </Grid>
                 })
              }
           </Grid>
        </Container>
     </div>
   );
}

export default AppWithReducer;
