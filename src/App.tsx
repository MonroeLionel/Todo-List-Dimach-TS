import React, {useState} from 'react';
import './App.css';
import {tasks1PropsType, TuduList} from "./TuduList";
import {v1} from "uuid";


export type FilterValueType = `all` | `completed` | `active`

function App() {

   let [tasks1, setTasks] = useState<Array<tasks1PropsType>>([
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Redax", isDone: false}
   ]);

   function addTask(title: string) {
      let newTask = {id: v1(), title: title, isDone: false}
      let newTasks = [newTask, ...tasks1]
      setTasks(newTasks)
   }

   console.log(tasks1)
   let [filter, sestFilter] = useState<FilterValueType>(`all`)

   let taskForTodolist = tasks1;
   if (filter === `completed`) {
      taskForTodolist = tasks1.filter(el => el.isDone === true)
   }
   if (filter === `active`) {
      taskForTodolist = tasks1.filter(el => el.isDone === false)
   }

   function removeTask(id: string) {
      let filteredTasks = tasks1.filter(el => el.id !== id)
      setTasks(filteredTasks);
   }

   function changeFilter(value: FilterValueType) {
      sestFilter(value);
   }

   return (
     <div className="App">
        <TuduList
          title={`What to learn`}
          tasks1={taskForTodolist}
          removeTasks={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
        />


     </div>
   );
}

export default App;
