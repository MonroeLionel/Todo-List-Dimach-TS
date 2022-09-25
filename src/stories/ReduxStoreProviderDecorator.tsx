import {Provider} from "react-redux";
import {store} from "../state/store";
import React from "react";

import AppWithRedux from "../AppWithRedux";



export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (

        <Provider store={store}> {storyFn()} </Provider>
    )

}
