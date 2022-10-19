import React, {useCallback, useReducer, useState} from 'react';
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
   removeTodolistAC, TodolistDomainType,
   todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TaskStateType = {
   [key: string]: Array<TaskType>
}

function AppWithRedux() {
   const dispatch = useDispatch()
   const todoList = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
   const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)

   const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
      const action = changeTaskStatusAC(todoListId, taskId, status)
      dispatch(action)
   }, [dispatch])

   const addTask = useCallback((title: string, todoListId: string) => {
      const action = addTaskAC(todoListId, title)
      dispatch(action)
   }, [dispatch])

   const removeTask = useCallback((id: string, todoListId: string) => {
      const action = removeTaskAC(todoListId, id)
      dispatch(action)

   }, [dispatch])

   const changeTaskTitleHandler = useCallback((taskId: string, newValue: string, todoListId: string) => {
      const action = changeTaskTitleAC(todoListId, taskId, newValue)
      dispatch(action)

   }, [dispatch])

   const changeFilterTask = useCallback((value: FilterValueType, todoListId: string) => {
      const action = changeTodolistFilterAC(value, todoListId)
      dispatch(action)
   }, [dispatch])

   const removeTuduList = useCallback((todoListId: string) => {
      const action = removeTodolistAC(todoListId)
      dispatch(action)
   }, [dispatch])

   const addTodoList = useCallback((title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
   }, [dispatch])

   const ChangeTuduListTitle = useCallback((newTitle: string, id: string) => {
      const action = changeTodolistTitleAC(newTitle, id)
      dispatch(action)
   }, [dispatch])


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
