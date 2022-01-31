import * as types from "../types/accountTypes";
import { setError, logoutUser } from "./authActionCreator";
import axios from 'axios';

const setAccount = ( data ) => ({
    type:types.SET_ACCOUNT,
    payload:data
})
const addAccount = ( data ) => ({
    type:types.ADD_ACCOUNT,
    payload:data
})
const resetAccount = () => ({
    type:types.RESET_ACCOUNT,
})
const deleteAccount = ( data ) => ({
    type:types.DELETE_ACCOUNT,
    payload:data,
})

const isSet = (data) => ({
    type:types.IS_SET,
    payload:data,
})

export const doItem = ( data, item, setProgress ) => dispatch => {

}

export const fetchAccount = ( user ) => dispatch => {
    if(user.is_superuser){
        axios.get(`http://127.0.0.1:8000/instructors/${user.id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
              }
        })
        .then(res => {
            dispatch(setAccount(res.data));
            dispatch(isSet(true));
        })
        .catch(err => {
            dispatch(isSet(false));
            const info= {
                error:"Failed to find account",
                status:err.response.status
            }
            dispatch(setError(info));
        })

    }
}

export const createInstructor = ( id ) => dispatch => {
    let form_data = new FormData();
    form_data.append('user', id);
    axios.post("http://127.0.0.1:8000/instructors/", form_data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(res => {
        dispatch(setAccount(res.data));
        dispatch(isSet(true));
    })
    .catch(err => {
        dispatch(isSet(false));
        const info= {
            error:"Failed to confirm account",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}