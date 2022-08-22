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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValueType = `all` | `completed` | `active`
export type TodoListType = {
   id: string
   title: string
   filter: FilterValueType
}

export type TaskStateType = {
   [key: string]: Array<tasks1PropsType>
}

function AppWithRedux() {

   function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
      const action = changeTaskStatusAC(todoListId, taskId, isDone)
      dispatch(action)
   }

   function addTask(title: string, todoListId: string) {
      const action = addTaskAC(todoListId, title)
      dispatch(action)
   }

   function removeTask(id: string, todoListId: string) {
      const action = removeTaskAC(todoListId, id)
      dispatch(action)

   }

   function changeTaskTitleHandler(taskId: string, newValue: string, todoListId: string) {
      const action = changeTaskTitleAC(todoListId, taskId, newValue)
      dispatch(action)

   }

   function changeFilterTask(value: FilterValueType, todoListId: string) {
      const action = changeTodolistFilterAC(value, todoListId)
      dispatch(action)
   }

   function removeTuduList(todoListId: string) {
      const action = removeTodolistAC(todoListId)
      dispatch(action)
   }

   function addTodoList(title: string) {
      const action = addTodolistAC(title)
      dispatch(action)
   }

   function ChangeTuduListTitle(newTitle: string, id: string) {
      const action = changeTodolistTitleAC(newTitle, id)
      dispatch(action)
   }


   const dispatch = useDispatch()
   const todoList = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
   const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)


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

export default AppWithRedux;
