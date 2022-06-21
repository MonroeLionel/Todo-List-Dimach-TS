import React from 'react';
import './App.css';
import {TuduList} from "./TuduList";

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <TuduList title={`What to learn`} tasks1={tasks1}/>

            <TuduList title={`What to buy`} tasks1={tasks2}/>

        </div>
    );
}

export default App;
