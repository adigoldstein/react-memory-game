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


class App extends Component {
    state = {
        userName: 'Adi',
        size: 6
    }


    onSizeSelection(e) {
        this.setState({size: e.target.value})
    }

    onStartGame = () => {
        console.log(this.props)
        if (!this.state.userName.length) {
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
                                size={this.state.size}
                                name={this.state.userName}
                                history={this.props.history}
                            />
                        </Route>
                        <Route exact path="/">
                            <div className="nameSection">
                                <input onChange={(e) => this.setState({userName: e.target.value})} type="text"
                                       placeholder='What is your name?' value={this.state.userName}/>
                            </div>
                            <Radio.Group onChange={this.onSizeSelection.bind(this)} value={this.state.size}>
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

export default withRouter(App);
