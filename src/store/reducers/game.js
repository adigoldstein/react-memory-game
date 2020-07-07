import * as actionTypes from '../actions'

const initState = {
    userName: '',
    size: 4,
    isGameOn: false
}

const gameReducer = (state = initState, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case actionTypes.ON_NAME_CHANGE :
            return {
                ...state,
                userName: action.value
            }
        case actionTypes.ON_GAME_ON :
            return {
                ...state,
                isGameOn: true
            }
        case actionTypes.ON_GAME_OFF :
            return {
                ...state,
                isGameOn: false
            }

        case actionTypes.ON_SIZE_CHANGE:
            return {
                ...state,
                size: action.value
            }
    }
    console.log('game is on:')
    console.log(state.isGameOn)
    return state;
}

export default gameReducer;
