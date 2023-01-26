import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";


export type TaskStateType = {
   [key: string]: Array<TaskType>
}

function AppWithRedux() {

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
           <TodolistsList/>
        </Container>
     </div>
   );
}


export default AppWithRedux;