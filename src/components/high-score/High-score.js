import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Table} from "antd";

import styles from './High-score.module.css'


const HighScore = props => {
    const [fourTableState, setFourTableState] = useState([])
    const [sixTableState, setSixTableState] = useState([])
    const [eightTableState, setEightTableState] = useState([])

    useEffect(() => {
        setFourTableState(props.scoreData.four.map((item, idx) => {
            return {
                name: item.name,
                key: idx,
                moves: item.steps
            }
        }));

        setSixTableState(props.scoreData.six.map((item, idx) => {
            return {
                name: item.name,
                key: idx,
                moves: item.steps
            }
        }));
        setEightTableState(props.scoreData.eight.map((item, idx) => {
            return {
                name: item.name,
                key: idx,
                moves: item.steps
            }
        }));
    }, [props.scoreData])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Moves',
            dataIndex: 'moves',
            key: 'moves',
        },

    ];

    let table = null;
    if (fourTableState.length) {
        table = (
            <div>
                <Table pagination={false} className={styles.table} size={'small'} dataSource={fourTableState}
                       columns={columns}/>
                <Table pagination={false} className={styles.table} size={'small'} dataSource={sixTableState}
                       columns={columns}/>
                <Table pagination={false} className={styles.table} size={'small'} dataSource={eightTableState}
                       columns={columns}/>
            </div>
        );
    }

    return (
        <div>
            <h3>High - score table</h3>
            {table}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        scoreData: state.highscore
    }
}

export default connect(mapStateToProps)(HighScore);
