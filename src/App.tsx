import React, {useState} from 'react';
import './App.css';
import {TuduList} from "./TuduList";
import {v1} from "uuid";
import {AddItemForm} from "./AddIdemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "./api/todolists-api";
import {FilterValueType, TodolistDomainType} from "./state/todolist-reducer";


export type TaskStateType = {
   [key: string]: Array<TaskType>
}

function App() {

   function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
      let task = tasksObj[todoListId].find((t) => t.id === taskId)
      if (task) {

         task.status = status
         setTasks({...tasksObj})

      }

   }

   function addTask(title: string, todoListId: string) {
      let newTask = {
         id: v1(), title: title, status: TaskStatuses.New,
         todoListId: todoListId,
         startDate: '',
         deadline: '',
         addedDate: '',
         order: 0,
         priority: TodoTaskPriorities.Low,
         completed: false,
         description: '',
      }
      let newTasks = [newTask, ...tasksObj[todoListId]]
      tasksObj[todoListId] = newTasks
      setTasks({...tasksObj})
   }

   function removeTask(id: string, todoListId: string) {
      let task = tasksObj[todoListId]
      let filteredTasks = task.filter(el => el.id !== id)
      tasksObj[todoListId] = filteredTasks
      setTasks({...tasksObj});
   }

   function changeFilterTask(value: FilterValueType, todoListId: string) {
      let tdList = todoList.find(tl => tl.id === todoListId)
      if (tdList) {
         tdList.filter = value
         setTodoList([...todoList])
      }
   }

   let todoListId1 = v1()
   let todoListId2 = v1()

   let [todoList, setTodoList] = useState<Array<TodolistDomainType>>([
      {id: todoListId1, title: `What to learn`, filter: `active`, order: 0, addedDate: ''},
      {id: todoListId2, title: `What to buy`, filter: `completed`, order: 0, addedDate: ''},
   ])

   let [tasksObj, setTasks] = useState<TaskStateType>({
      [todoListId1]: [
         {
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            completed: false,
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
            completed: false,
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
            completed: false,
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
            completed: false,
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
            completed: false,
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
            completed: false,
            description: '',
         },
      ],
   })

   const removeTuduList = (todoListId: string) => {
      let filteredTodolist = todoList.filter(tl => tl.id !== todoListId)
      setTodoList(filteredTodolist)

      delete tasksObj[todoListId]
      setTasks({...tasksObj})
   }

   const addTodoList = (title: string) => {
      let newtodoList: TodolistDomainType = {
         id: v1(),
         filter: 'all',
         title: title,
         addedDate: '',
         order: 0,
      }
      setTodoList([newtodoList, ...todoList])
      setTasks({...tasksObj, [newtodoList.id]: []})
   }

   const changeTaskTitleHandler = (taskId: string, newValue: string, todoListId: string) => {
      let task = tasksObj[todoListId].find((t) => t.id === taskId)
      if (task) {
         task.title = newValue
         setTasks({...tasksObj})
      }
   }

   const ChangeTuduListTitle = (newTitle: string, id: string) => {
      const newtodoList = todoList.find(tl => tl.id === id)
      if (newtodoList) {
         newtodoList.title = newTitle
         setTodoList([...todoList])
      }

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
}

export default App;
