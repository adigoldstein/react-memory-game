import * as actionTypes from './actions'

const initState = {
    userName: 'Adi - store',
    size: 4,
    isGameOn: false,
    highScore: {
        4: [
            {name: 'Adi', steps: 6},
            {name: 'Batia', steps: 8},
            {name: 'David', steps: 9},
            {name: 'Ron', steps: 20},
            {name: 'Jessi', steps: 14}
        ],
        6: [
            {name: 'Shlomi', steps: 6},
            {name: 'Noam', steps: 8},
            {name: 'OlegT', steps: 9},
            {name: 'OlegD', steps: 20},
            {name: 'Boris', steps: 14}
        ],
        8: [
            {name: 'Martin', steps: 6},
            {name: 'Mark', steps: 8},
            {name: 'Yael', steps: 9},
            {name: 'Avi', steps: 20},
            {name: 'Jakx', steps: 14}
        ]
    }
}

const reducer = (state = initState, action) => {
    console.log('reducer ran')
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
    return state;
}

export default reducer;
