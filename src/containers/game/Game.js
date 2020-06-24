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
            gameEndedModal: false
        }
    }


    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

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
        this.props.onGameOn();
        this.initCards();

    }

    initCards = () => {
        const colorsArray = ['red', 'blue', 'green', 'yellow', 'red', 'blue', 'green', 'yellow'];
        if (this.props.size >= 6) {
            colorsArray.push('darkgray', 'darkgray', 'tan' , 'tan');
        }
        if (this.props.size === 8) {
            colorsArray.push('mediumvioletred', 'mediumvioletred', 'CadetBlue' , 'CadetBlue');

        }

        // Check other sizes here!!!!!!!
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

        console.log(card);
        if (this.state.alreadyFlipped) {
            this.setState({moves: this.state.moves + 1})
            if (this.state.alreadyFlipped.color === card.color) {
                // 2 cards flipped, a match!

                let oldState = [...this.state.cards];
                const i = oldState.findIndex(c=> c.index === card.index)
                const iFlipped = oldState.findIndex(c=> c.index === this.state.alreadyFlipped.index)
                oldState[i].isDone = true;
                oldState[iFlipped].isDone = true;
                this.setState({cards: oldState, pairs: this.state.pairs + 1, alreadyFlipped: null},
                    () => {
                        if (this.props.size === this.state.pairs) {
                            // game over! victory!!
                            this.props.onGameOff();

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
                console.log('no match')
                let oldState = [...this.state.cards];
                const i = oldState.findIndex(c=> c.index === card.index)
                oldState[i].isFlipped = true;
                this.setState({gamePaused: true})

                setTimeout(() => {
                    console.log('2 sec')
                    oldState[i].isFlipped = false;
                    const iFlipped = oldState.findIndex(c=> c.index === this.state.alreadyFlipped.index)
                    oldState[iFlipped].isFlipped = false;
                    this.setState({cards: oldState, alreadyFlipped: null, gamePaused: false});

                }, 1000)

            }

        } else {
            // first card flip
            console.log('first flip')
            let oldCards = [...this.state.cards];
            const i = oldCards.findIndex(c=> c.index === card.index);
            oldCards[i].isFlipped = true;
            this.setState({cards: oldCards, alreadyFlipped: card})

        }
    }

    startNewGame = e => {
        console.log(e);
        this.setState({
            cards: [],
            steps: 0,
            alreadyFlipped: null,
            gamePaused: false,
            pairs: 0,
            gameEndedModal: false
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
                <p>Y0, {this.props.name}, you are playing {this.props.size} pairs game!</p>
                <div className={styles.moves}>Moves: {this.state.moves}</div>
                <Row gutter={[16, 16]}>
                    {this.state.cards.map(c => <Card key={c.index} card={c} size={this.props.size} cardClickHandler={this.onCardClick}/>)}
                </Row>
                <Modal
                    title="VICTORY!"
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
        size: state.size,
        name: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGameOn: () => dispatch({type: actionTypes.ON_GAME_ON}),
        onGameOff: () => dispatch({type: actionTypes.ON_GAME_OFF})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
