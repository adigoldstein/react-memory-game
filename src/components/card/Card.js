import React from "react";
import {Col} from "antd";
import styles from './Card.module.css'

const Card = props => {

    let card = <div className={styles.card} onClick={() => props.cardClickHandler(props.card)}> ? </div>

    if (props.card.isFlipped || props.card.isDone) {
        card = <div className={[styles.card, styles[props.card.color]].join(' ')}></div>
    }

    let spanSize = 6;
    if (props.size === 8) {
        spanSize = 4
    }
    return (
        <Col span={spanSize}>
            {card}
        </Col>
    )
}
export default Card;
