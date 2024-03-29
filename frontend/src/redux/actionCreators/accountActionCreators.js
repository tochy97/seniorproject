import * as types from "../types/accountTypes";
import { setError, logoutUser, setAllowed, setMount, checkUser } from "./authActionCreator";
import axios from 'axios';

const setAccount = ( data ) => ({
    type:types.SET_ACCOUNT,
    payload:data
})
export const resetAccount = () => ({
    type:types.RESET_ACCOUNT,
})
export const mountAccount = ( data ) => ({
    type:types.IS_SET,
    payload:data,
})
const getInstructors = ( data ) => ({
    type:types.GET_INSTRUCTORS,
    payload:data,
})
const getMyInstructor = ( data ) => ({
    type:types.GET_MY_INSTRUCTOR,
    payload:data,
})

export const fetchMyInstructor = ( id ) => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/users/${id}/`, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
    })
    .then((res) => {
        console.log(res.data)
        const output = {
            first_name: res.data.first_name,
            last_name: res.data.last_name,
        }
        dispatch(getMyInstructor(output))
    })
    .catch(err => {
        const info= {
            error:"Failed finding your instrcutor",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}

export const fetchInstructors = () => async dispatch => {
    await axios.get("http://127.0.0.1:8000/users/", {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
    })
    .then((res) => {
        const output = []
        let temp;
        res.data.forEach(element => {
            if(element.is_staff){
                temp = {
                    first: element.first_name,
                    last: element.last_name,
                    id: element.id,
                }
                output.push(temp);
            }
        });
        dispatch(getInstructors(output))
    })
    .catch(err => {
        dispatch(mountAccount(true));
        const info= {
            error:"Failed to find instrcutors",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}

export const fetchAccount = ( id ) => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/accounts/${id}/`, {
    headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
        dispatch(setAccount(res.data));
    })
    .catch(err => {
        if(err.response.status !== 401)
        {
            dispatch(mountAccount(true));
        }
        const info= {
            error:"Failed to find account",
            status:err.response.status
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
    })
    .catch(err => {
        const info= {
            error:"Failed creating account",
            status:err.response.status
        }
        dispatch(setError(info));
    })
    
}   

export const updateAccount = ( userData, id, accountData ) => async dispatch => {
    const form_data = JSON.stringify(userData)
    await axios.put(`http://127.0.0.1:8000/userapi/${id}/`, form_data, {
        headers:{
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        (async () => {
            let account_data = JSON.stringify(accountData)
            console.log(accountData)
            await axios.put(`http://127.0.0.1:8000/accounts/${id}/`, account_data, {
                headers:{
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(res2 => {
                dispatch(checkUser());
                dispatch(setAccount(res2.data));
            })
            .catch(err => {
                const info= {
                    error:"Failed to update",
                    status:err.response.status
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        const info= {
            error:"Failed to update",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}
