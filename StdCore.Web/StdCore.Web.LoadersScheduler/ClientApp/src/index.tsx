import {render} from "react-dom";
import {App} from "./app";
import React from "react";
import "./index.scss";
import "./constants.scss";
import {Provider} from "react-redux";
import {configureStore} from "./redux/reducers";
import {BrowserRouter} from "react-router-dom";
import {TaskSubscriptionInitializer} from "./subscriptions/task.subscriptions";

const store = configureStore();
const taskSubscriptionInitializer = new TaskSubscriptionInitializer(store.dispatch);
taskSubscriptionInitializer.initialize();

render(<Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>, document.getElementById("app"));
