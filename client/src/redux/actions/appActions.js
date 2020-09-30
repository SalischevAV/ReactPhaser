import { SHOW_ALERT, HIDE_ALERT, SHOW_LOADER, HIDE_LOADER } from '../types';

export function hideAlert(){
    return{
        type: HIDE_ALERT
    }
}

export function showAlert(alert){
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: alert,
        });   

    setTimeout(()=> dispatch(hideAlert()), 3000);
}
}