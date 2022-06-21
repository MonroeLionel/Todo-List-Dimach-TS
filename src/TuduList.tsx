import React from "react";
import {FilterValueType} from "./App";

type TuduListPropsType = {
    title: string
    title2?: boolean
    tasks1: Array<tasks1PropsType>
    removeTasks: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}
export type tasks1PropsType = {
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
                {/*MAP это метод массива который на основе каждого объекта в массиве создает*/}
                {/*какой то другой элемент*/}
                {/*на выходе мы получаем новый массив с этими новыми элементами*/}
                {props.tasks1.map(el => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {
                                props.removeTasks(el.id)
                            }}>x
                            </button>
                        </li>

                    )
                })}


            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter(`all`)
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter(`active`)
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter(`completed`)
                }}>Completed
                </button>
            </div>
        </div>
    )
}