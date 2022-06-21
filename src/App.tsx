import React, {useState} from 'react';
import './App.css';
import {tasks1PropsType, TuduList} from "./TuduList";

// export function Counter() {
//     console.log(`counter render`);
//     let arr = useState(5);
//     let data = arr[0];
//     let setData = arr[1]
//
//     return <div onClick={() => {
//         setData(data + 1)
//     }}>{data}</div>
// }
export type FilterValueType = `all` | `completed` | `active`

function App() {
    // let initTask = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false},
    //     {id: 4, title: "Redax", isDone: false}
    // ]
    //let arr = useState(initTask);
    // let tasks1 = arr[0];
    // let setTasks = arr[1];
    let [tasks1, setTasks] = useState<Array<tasks1PropsType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redax", isDone: false}
    ]);
    let [filter, sestFilter] = useState<FilterValueType>(`all`)

    let taskForTodolist = tasks1;
    if (filter === `completed`) {
        taskForTodolist = tasks1.filter(el => el.isDone === true)
    }
    if (filter === `active`) {
        taskForTodolist = tasks1.filter(el => el.isDone === false)
    }
    // const tasks2 = [
    //     {id: 1, title: "Hello world", isDone: true},
    //     {id: 2, title: "I am Happy", isDone: false},
    //     {id: 3, title: "Yo", isDone: false}
    // ]
    function removeTask(id: number) {
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
            />

            {/*<TuduList title={`What to buy`} tasks1={tasks2}/>*/}

        </div>
    );
}

export default App;
