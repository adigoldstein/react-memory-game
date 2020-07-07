import React, {Component} from "react";
import Card from "../../components/card/Card";
import {notification, Row, Modal} from "antd";
import styles from './Game.module.css'
import * as actionTypes from './../../store/actions';
import {connect} from 'react-redux';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            moves: 0,
            alreadyFlipped: null,
            gamePaused: false,
            pairs: 0,
            gameEndedModal: false,
            isNewHighscore:false
        }
    }

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }


    componentDidMount() {
        this.initCards();
    }

    initCards = () => {
        this.props.onGameOn();

        const colorsArray = ['red', 'blue', 'green', 'yellow', 'red', 'blue', 'green', 'yellow'];
        if (this.props.size >= 6) {
            colorsArray.push('darkgray', 'darkgray', 'tan', 'tan');
        }
        if (this.props.size === 8) {
            colorsArray.push('mediumvioletred', 'mediumvioletred', 'CadetBlue', 'CadetBlue');

        }
        let cardsData = [];
        let index = 0;
        for (const color of colorsArray) {
            cardsData.push({index, color, isFlipped: false, isDone: false})
            index++;
        }
        cardsData = this.shuffle(cardsData)
        this.setState({cards: cardsData})
    }

    onCardClick = (card) => {
        if (this.state.gamePaused) {
            return;
        }
        if (this.state.alreadyFlipped) {
            this.setState({moves: this.state.moves + 1})
            if (this.state.alreadyFlipped.color === card.color) {
                // 2 cards flipped, a match!
                let oldState = [...this.state.cards];
                const i = oldState.findIndex(c => c.index === card.index)
                const iFlipped = oldState.findIndex(c => c.index === this.state.alreadyFlipped.index)
                oldState[i].isDone = true;
                oldState[iFlipped].isDone = true;
                this.setState({cards: oldState, pairs: this.state.pairs + 1, alreadyFlipped: null},
                    () => {
                        if (this.props.size === this.state.pairs) {
                            // game over! victory!!
                            this.props.onGameOff();
                            this.setState({isNewHighscore: this.checkIfEnteredHighscore()})

                            this.setState({gameEndedModal: true})

                        } else {
                            notification.success({
                                message: 'YES CHAMP!',
                                description: 'That\'s a pair right here!'
                            });
                        }
                    });
            } else {
                // 2 cards flipped, no match
                let oldState = [...this.state.cards];
                const i = oldState.findIndex(c => c.index === card.index)
                oldState[i].isFlipped = true;
                this.setState({gamePaused: true})

                setTimeout(() => {
                    oldState[i].isFlipped = false;
                    const iFlipped = oldState.findIndex(c => c.index === this.state.alreadyFlipped.index)
                    oldState[iFlipped].isFlipped = false;
                    this.setState({cards: oldState, alreadyFlipped: null, gamePaused: false});

                }, 1000)
            }

        } else {
            // first card flip
            let oldCards = [...this.state.cards];
            const i = oldCards.findIndex(c => c.index === card.index);
            oldCards[i].isFlipped = true;
            this.setState({cards: oldCards, alreadyFlipped: card})
        }
    }

    checkIfEnteredHighscore = () => {
        // eslint-disable-next-line
        switch (this.props.size) {

            case 4:
                if (this.state.moves <= this.props.highScore.four[this.props.highScore.four.length - 1].steps) {
                    this.props.add4NewHighscore({name: this.props.name, steps: this.state.moves});
                    return true
                }
                return false;

            case 6:
                if (this.state.moves <= this.props.highScore.six[this.props.highScore.six.length - 1].steps) {
                    this.props.add6NewHighscore({name: this.props.name, steps: this.state.moves});
                    return true;
                }
                return false;

            case 8:
                if (this.state.moves <= this.props.highScore.eight[this.props.highScore.four.length - 1].steps) {
                    this.props.add8NewHighscore({name: this.props.name, steps: this.state.moves});
                    return true;
                }
                return false;
        }
    }

    startNewGame = () => {
        this.setState({
            cards: [],
            steps: 0,
            alreadyFlipped: null,
            gamePaused: false,
            pairs: 0,
            gameEndedModal: false,
            isNewHighscore:false
        }, () => {
            this.initCards();
        });
    };

    backHome = e => {
        this.props.history.push('/');


    };

    render() {
        return (
            <div>
                <p>Yo {this.props.name}, you are playing {this.props.size} pairs game!</p>
                <div className={styles.moves}>Moves: {this.state.moves}</div>
                <Row gutter={[16, 16]} justify="center">
                    {this.state.cards.map(c => <Card key={c.index} card={c} size={this.props.size}
                                                     cardClickHandler={this.onCardClick}/>)}
                </Row>
                <Modal
                    title={this.state.isNewHighscore? 'NEW HIGH SCORE!!!' : 'VICTORY!'}
                    visible={this.state.gameEndedModal}
                    onOk={this.startNewGame}
                    onCancel={this.backHome}
                >
                    <p>{this.props.name}, You made it! you done it in <b>{this.state.moves} moves!</b></p>
                    <p>Wanna start a new game?</p>
                </Modal>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        size: state.game.size,
        name: state.game.userName,
        highScore: state.highscore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGameOn: () => dispatch({type: actionTypes.ON_GAME_ON}),
        onGameOff: () => dispatch({type: actionTypes.ON_GAME_OFF}),
        add4NewHighscore: (payload) => dispatch({type: actionTypes.ADD_4_NEW_HIGHSCORE, payload: payload}),
        add6NewHighscore: (payload) => dispatch({type: actionTypes.ADD_6_NEW_HIGHSCORE, payload: payload}),
        add8NewHighscore: (payload) => dispatch({type: actionTypes.ADD_8_NEW_HIGHSCORE, payload: payload}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
