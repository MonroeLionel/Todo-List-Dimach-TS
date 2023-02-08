import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../../../app/store";
import {
   addTodolistsTC,
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   FilterValueType,
   removeTodolistsTC,
   TodolistDomainType
} from "./todolist-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./task-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../components/AddItemForm/AddIdemForm";
import {TuduList} from "./TuduList";
import {TaskStateType} from "../../../app/AppWithRedux";

export const TodolistsList: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const todoList = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
   const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)

   useEffect(() => {


      dispatch(fetchTodolistsTC())
   }, [])

   const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
      const thunk = updateTaskTC(taskId, {status}, todoListId)

      dispatch(thunk)
   }, [dispatch])

   const addTask = useCallback((title: string, todoListId: string) => {
      const thunk = addTaskTC(todoListId, title)

      dispatch(thunk)
   }, [dispatch])

   const removeTask = useCallback((todoListId: string, taskId: string) => {
      const thunk = removeTaskTC(todoListId, taskId)

      dispatch(thunk)
   }, [dispatch])

   const changeTaskTitleHandler = useCallback((taskId: string, newValue: string, todoListId: string) => {
      const thunk = updateTaskTC(taskId, {title: newValue}, todoListId)

      dispatch(thunk)

   }, [dispatch])

   const changeFilterTask = useCallback((value: FilterValueType, todoListId: string) => {
      const action = changeTodolistFilterAC(value, todoListId)
      dispatch(action)
   }, [dispatch])

   const removeTuduList = useCallback((todoListId: string) => {
      const thunk = removeTodolistsTC(todoListId)

      dispatch(thunk)
   }, [dispatch])

   const addTodoList = useCallback((title: string) => {
      const thunk = addTodolistsTC(title)

      dispatch(thunk)
   }, [dispatch])

   const ChangeTuduListTitle = useCallback((newTitle: string, id: string) => {
      const thunk = changeTodolistTitleTC(newTitle, id)

      dispatch(thunk)
   }, [dispatch])

   return (
     <>
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
     </>
   )
}