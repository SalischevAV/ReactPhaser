import { LOGIN_USER, LOGOUT_USER, SET_SCORE, GET_SCORE } from '../types';

const initialState = {
    currentUser: {},
    isAuth: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_SCORE:
            return{
                ...state,
                currentUser:{...state.currentUser, highScore: action.payload}
            }
        default: return state;
    }
}

export default userReducer;