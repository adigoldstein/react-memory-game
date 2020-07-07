import * as actionTypes from '../actions'

const sortByKey = (array, key) => {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
const initState = {
    four: [
        {name: 'Adi', steps: 4},
        {name: 'Batia', steps: 8},
        {name: 'David', steps: 9},
        {name: 'Jessi', steps: 14},
        {name: 'Ron', steps: 20}
    ],
    six: [
        {name: 'Shlomi', steps: 6},
        {name: 'Noam', steps: 8},
        {name: 'OlegT', steps: 9},
        {name: 'Boris', steps: 14},
        {name: 'OlegD', steps: 20}
    ],
    eight: [
        {name: 'Martin', steps: 8},
        {name: 'Mark', steps: 8},
        {name: 'Yael', steps: 9},
        {name: 'Jakx', steps: 14},
        {name: 'Avi', steps: 20}
    ]
}

const highscoreReducer = (state = initState, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case (actionTypes.ADD_4_NEW_HIGHSCORE):
            const newFour = [...state.four];
            newFour.pop();
            newFour.push({name: action.payload.name, steps: action.payload.steps});
            sortByKey(newFour, 'steps');
            return  {
                ...state,
                 four: newFour
            };

    }
    return state;
}
export default highscoreReducer;


