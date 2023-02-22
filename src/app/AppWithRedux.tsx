import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
   AppBar,
   Button,
   CircularProgress,
   Container,
   IconButton,
   LinearProgress,
   Toolbar,
   Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";
import {ErrorSnackBar} from "../components/ErroroSnackbar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/TodolistsList/Login/Login";
import {logoutTC} from "../features/TodolistsList/Login/auth-reducer";


export type TaskStateType = {
   [key: string]: Array<TaskType>
}

function AppWithRedux() {
   const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

   const dispatch = useDispatch()
   useEffect(() => {
      // @ts-ignore
      dispatch(initializedAppTC())
   }, [])
   const logoutHandler = useCallback(() => {
      // @ts-ignore
      return dispatch(logoutTC());
   }, [])

   const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)
   const initialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized)
   if (!initialized) {
      return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   }


   return (
     <BrowserRouter>
        <div className="App">
           <ErrorSnackBar/>
           <AppBar position={"static"}>
              <Toolbar>
                 <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}> <Menu/></IconButton>
                 <Typography variant={"h6"}>
                    News
                 </Typography>
                 {isLoggedIn && <Button onClick={logoutHandler} color={"inherit"}>Log out</Button>}
              </Toolbar>
              {status === "loading" && <LinearProgress/>}
           </AppBar>
           <Container fixed>
              <Routes>
                 <Route path={"/"} element={<TodolistsList/>}/>
                 <Route path={"/login"} element={<Login/>}/>
              </Routes>


           </Container>
        </div>
     </BrowserRouter>
   );
}


export default AppWithRedux;
