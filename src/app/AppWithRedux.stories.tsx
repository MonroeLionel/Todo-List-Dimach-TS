import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
   title: 'AppWithRedux component',
   component: AppWithRedux,
   decorators: [ReduxStoreProviderDecorator]

}


export const AppWithReduxBaseExample = () => {
   return <AppWithRedux/>
}