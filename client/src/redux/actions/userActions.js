import { LOGIN_USER, LOGOUT_USER } from '../types';
import axios from 'axios';
import SERVER from '../SERVER';
import { showAlert } from './appActions';
import setCookie from '../../utils/setCookie';
import getCookie from '../../utils/getCookie';
import deleteCookie from '../../utils/deleteCookie';
import regeneratorRuntime from "regenerator-runtime";


export function registraion(email, password, name) {
    return dispatch => {
        axios
            .post(`${SERVER}signup`, {
                email,
                password,
                name
            })
            .then(res => dispatch(showAlert(res.data.message)))
            .catch(err => dispatch(showAlert(err.message)))
    }
}

export function login(email, password) {
    return dispatch => {
        axios
            .post(`${SERVER}login`, {
                email,
                password
            })
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data.user
                })
                setCookie('token', res.data.token);
                setCookie('refreshToken', res.data.refreshToken);
            })
            .catch(err => dispatch(showAlert(err.message)))
    }
}

export function token(email) {
    return dispatch => {
        const refreshToken = getCookie('refreshToken')
        axios
            .post(`${SERVER}token`, {
                email,
                refreshToken
            })
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data.user
                })
                setCookie('token', res.data.token);
            })
            .catch(err => dispatch(showAlert(err.message)))
    }
}

export function logout() {
    return dispatch => {
        axios.get(`${SERVER}logout`)
            .then(res => {
                dispatch({
                    type: LOGOUT_USER
                });
                deleteCookie('token');
                deleteCookie('refreshToken');
            })
            .catch(err => dispatch(showAlert(err.message)))
    }
}

