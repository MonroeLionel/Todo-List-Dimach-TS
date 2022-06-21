import React from "react";

type TuduListPropsType = {
    title: string
    title2?: boolean
    tasks1: Array<tasks1PropsType>
}
type tasks1PropsType = {
    id: number,
    title: string,
    isDone: boolean
}

export function TuduList(props: TuduListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <h3>{props.title2}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks1.map(el => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>

                    )
                })}


            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}