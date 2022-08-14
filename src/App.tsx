import React, {useState} from 'react';
import './App.css';
import {tasks1PropsType, TuduList} from "./TuduList";
import {v1} from "uuid";
import {AddItemForm} from "./AddIdemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValueType = `all` | `completed` | `active`
export type TodoListType = {
   id: string
   title: string
   filter: FilterValueType
}

export type TaskStateType = {
   [key: string]: Array<tasks1PropsType>
}

function App() {

   // let [tasksObj, setTasks] = useState<Array<tasks1PropsType>>([
   //    {id: v1(), title: "HTML&CSS", isDone: true},
   //    {id: v1(), title: "JS", isDone: true},
   //    {id: v1(), title: "ReactJS", isDone: false},
   //    {id: v1(), title: "Redax", isDone: false}
   // ]);

   function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
      let task = tasksObj[todoListId].find((t) => t.id === taskId)
      if (task) {
         //
         // console.log(task)
         // console.log(isDone)
         task.isDone = isDone
         setTasks({...tasksObj})

      }

   }

   function addTask(title: string, todoListId: string) {
      let newTask = {id: v1(), title: title, isDone: false}
      let newTasks = [newTask, ...tasksObj[todoListId]]
      tasksObj[todoListId] = newTasks
      setTasks({...tasksObj})
   }

   // console.log(tasksObj)
   // let [filter, sestFilter] = useState<FilterValueType>(`all`)


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
      // sestFilter(value);
   }

   let todoListId1 = v1()
   let todoListId2 = v1()

   let [todoList, setTodoList] = useState<Array<TodoListType>>([
      {id: todoListId1, title: `What to learn`, filter: `active`},
      {id: todoListId2, title: `What to buy`, filter: `completed`},
   ])

   let [tasksObj, setTasks] = useState<TaskStateType>({
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

   const removeTuduList = (todoListId: string) => {
      let filteredTodolist = todoList.filter(tl => tl.id !== todoListId)
      setTodoList(filteredTodolist)

      delete tasksObj[todoListId]
      setTasks({...tasksObj})
   }
   const addTodoList = (title: string) => {
      let newtodoList: TodoListType = {
         id: v1(),
         filter: 'all',
         title: title
      }
      setTodoList([newtodoList, ...todoList])
      setTasks({...tasksObj, [newtodoList.id]: []})
   }
   const changeTaskTitleHandler = (taskId: string, newValue: string, todoListId: string) => {
      let task = tasksObj[todoListId].find((t) => t.id === taskId)
      if (task) {
         //
         // console.log(task)
         // console.log(isDone)
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

export default App;
