import React, {useReducer, useState} from 'react';
import './App.css';
import {tasks1PropsType, TuduList} from "./TuduList";
import {v1} from "uuid";
import {AddItemForm} from "./AddIdemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";


export type FilterValueType = `all` | `completed` | `active`
export type TodoListType = {
   id: string
   title: string
   filter: FilterValueType
}

export type TaskStateType = {
   [key: string]: Array<tasks1PropsType>
}

function AppWithReducer() {

   function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
      const action = changeTaskStatusAC(todoListId, taskId, isDone)
      dispatchTaskReducer(action)
   }

   function addTask(title: string, todoListId: string) {
      const action = addTaskAC(todoListId, title)
      dispatchTaskReducer(action)
   }

   function removeTask(id: string, todoListId: string) {
      const action = removeTaskAC(todoListId, id)
      dispatchTaskReducer(action)

   }

   function changeTaskTitleHandler(taskId: string, newValue: string, todoListId: string) {
      const action = changeTaskTitleAC(todoListId, taskId, newValue)
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
      const action = addTodolistAC(title)
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
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ])

   let [tasksObj, dispatchTaskReducer] = useReducer(tasksReducer, {
      [todoListId1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Redax", isDone: false}
      ],
      [todoListId2]: [
         {id: v1(), title: "book", isDone: true},
         {id: v1(), title: "milk", isDone: true},
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
                       taskForTodolist = tasksObj[tl.id].filter(el => el.isDone === true)
                    }
                    if (tl.filter === `active`) {
                       taskForTodolist = tasksObj[tl.id].filter(el => el.isDone === false)
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
