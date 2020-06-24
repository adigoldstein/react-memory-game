import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {Radio, Button, notification} from "antd";
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import HighScore from "../../components/high-score/High-score";
import Game from "../game/Game";
import {withRouter} from "react-router-dom";
import * as actionTypes from './../../store/actions';
import {connect} from 'react-redux';


class App extends Component {





    onStartGame = () => {
        if (!this.props.name.length) {
            this.nameNotification();
            return;
        }
        this.props.history.push('/game');


    }

    nameNotification = () => {
        notification.warning({
            message: 'Name requierd',
            description:
                'Please enter you user name. You may also get to the high-score hall of fame!',
        });
    };

    render() {
        return (
            <div className="app">
                <header className="App-header">
                    <h1>Memory Game app</h1>
                    <p>game is {this.props.isGameOn ? 'on!': 'off'}</p>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/high-score">
                                    High-score
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/high-score">
                        <HighScore/>
                    </Route>
                    <Route path="/Game">
                        <Game

                            history={this.props.history}
                        />
                    </Route>
                    <Route exact path="/">
                        <div className="nameSection">
                            <input onChange={(e) => this.props.onNameChange(e.target.value)} type="text"
                                   placeholder='What is your name?' value={this.props.name}/>
                        </div>
                        <Radio.Group onChange={(e)=>this.props.onSizeChange(e.target.value)} value={this.props.size}>
                            <Radio value={4}>4</Radio>
                            <Radio value={6}>6</Radio>
                            <Radio value={8}>8</Radio>
                        </Radio.Group>
                        <div>
                            <Button onClick={this.onStartGame} type="primary">Yalla!</Button>
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        size: state.size,
        name: state.userName,
        isGameOn: state.isGameOn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) => dispatch({type: actionTypes.ON_NAME_CHANGE, value: value}),
        onSizeChange: (value) => dispatch({type: actionTypes.ON_SIZE_CHANGE, value: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
