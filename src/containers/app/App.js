import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {Radio, Button, notification} from "antd";
import {Switch, Route} from "react-router-dom";
import HighScore from "../../components/high-score/High-score";
import Game from "../game/Game";
import {withRouter} from "react-router-dom";
import * as actionTypes from './../../store/actions';
import {connect} from 'react-redux';
import Nav from "../nav/Nav";


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
            message: 'Name required',
            description:
                'Please enter you user name. You may also get to the high-score hall of fame!',
        });
    };

    render() {
        return (
            <div className="app">
                <header className="App-header">
                    <h1>Memory Game app</h1>
                    <Nav history={this.props.history}/>
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
                            <input className={'name-input'} onChange={(e) => this.props.onNameChange(e.target.value)}
                                   type="text"
                                   autoFocus placeholder='What is your name?' value={this.props.name}/>
                        </div>
                        <p>Choose how many pairs will be on the board:</p>
                        <Radio.Group onChange={(e) => this.props.onSizeChange(e.target.value)} value={this.props.size}>
                            <Radio value={4}>4</Radio>
                            <Radio value={6}>6</Radio>
                            <Radio value={8}>8</Radio>
                        </Radio.Group>
                        <div>
                            <Button className={'start-game'} onClick={this.onStartGame} type="primary">Yalla!</Button>
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        size: state.game.size,
        name: state.game.userName,
        isGameOn: state.game.isGameOn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) => dispatch({type: actionTypes.ON_NAME_CHANGE, value: value}),
        onSizeChange: (value) => dispatch({type: actionTypes.ON_SIZE_CHANGE, value: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
