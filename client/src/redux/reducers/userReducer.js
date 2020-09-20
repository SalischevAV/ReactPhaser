import { LOGIN_USER, LOGOUT_USER } from '../types';

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
        default: return state;
    }
}

export default userReducer;