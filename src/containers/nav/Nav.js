import React, {Component} from 'react';
import {Menu, Modal} from "antd";
import {connect} from 'react-redux';
import {HomeOutlined, AppstoreOutlined} from '@ant-design/icons';
import * as actionTypes from "../../store/actions";
import styles from './Nav.module.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShown: false,
            targetNavigation: ''
        }
    }

    componentDidUpdate = () => {
        console.log(this.props.isGameOn)
        if (this.state.targetNavigation !== '' && !this.state.isModalShown  ) {
            if (this.props.isGameOn ) {
                console.log('component did update, game is on');
                this.setState({isModalShown: true});
            } else {
                // No game is on
                this.props.history.push(this.state.targetNavigation);
                if (this.state.isModalShown) {
                    this.setState({isModalShown: false, targetNavigation:''});
                }
            }
        }
    }

    navClick = (target) => {
        this.setState({targetNavigation: target})
    }

    navConfirmed = () => {
        this.props.onEndGame();
        this.props.history.push(this.state.targetNavigation)
        this.setState({isModalShown: false, targetNavigation: ''});

    }

    navCanceled = () => {
        this.setState({targetNavigation: '', isModalShown: false})
    }

    render() {
        return (
            <div className={styles.navWrapper}>
                <nav>
                    <Menu mode="horizontal">
                        <Menu.Item onClick={() => this.navClick('/')} key={'home'}
                                   icon={<HomeOutlined/>}>HOME</Menu.Item>
                        <Menu.Item onClick={() => this.navClick('/high-score')} key={'high-score'}
                                   icon={<AppstoreOutlined/>}>HIGH-SCORE</Menu.Item>
                    </Menu>
                </nav>
                <Modal
                    title="Wait!"
                    visible={this.state.isModalShown}
                    onOk={this.navConfirmed}
                    onCancel={this.navCanceled}
                    okText="Quit"
                    cancelText="Keep playing"
                >
                    <p>You have a game going here.</p>
                    <p>Sure you wanna quit?</p>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isGameOn: state.game.isGameOn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEndGame: () => dispatch({type: actionTypes.ON_GAME_OFF})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
