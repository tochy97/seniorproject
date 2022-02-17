import * as types from "../types/accountTypes";
import { setError, logoutUser, setAllowed, setMount } from "./authActionCreator";
import axios from 'axios';

const setAccount = ( data ) => ({
    type:types.SET_ACCOUNT,
    payload:data
})
const addAccount = ( data ) => ({
    type:types.ADD_ACCOUNT,
    payload:data
})
export const resetAccount = () => ({
    type:types.RESET_ACCOUNT,
})
const deleteAccount = ( data ) => ({
    type:types.DELETE_ACCOUNT,
    payload:data,
})
export const mountAccount = ( data ) => ({
    type:types.IS_SET,
    payload:data,
})

export const fetchAccount = ( id ) => async dispatch => {
    dispatch(setMount(false));
    await axios.get(`http://127.0.0.1:8000/accounts/${id}/`, {
    headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
        dispatch(setAllowed(true));
        dispatch(setAccount(res.data));
    })
    .catch(err => {
        dispatch(mountAccount(true));
        const info= {
            error:"Failed to find account",
            status:404
        }
        dispatch(setError(info));
    })
}

export const createAccount = ( id ) => async dispatch => {

    let form_data = new FormData();
    form_data.append('user', id);
    await axios.post("http://127.0.0.1:8000/accounts/", form_data, {
        headers:{
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        dispatch(setAccount(res.data));
        dispatch(setAllowed(true));
    })
    .catch(err => {
        const info= {
            error:"Failed to send",
            status:404
        }
        dispatch(setError(info));
    })
    
}   