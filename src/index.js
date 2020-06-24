import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import reducer from "./store/reducer";
import {Provider} from 'react-redux'
import {createStore} from "redux";


const store = createStore(reducer)
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
