import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
// import reducer from "./store/reducer";
import gameReducer from "./store/reducers/game";
import highscoreReducer from "./store/reducers/highscore";
import {Provider} from 'react-redux'
import {createStore, combineReducers} from "redux";

const rootReducer = combineReducers({
    game:gameReducer,
    highscore:highscoreReducer
})
const store = createStore(rootReducer)
ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
