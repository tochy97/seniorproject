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
const getInstructors = ( data ) => ({
    type:types.GET_INSTRUCTORS,
    payload:data,
})

export const fetchMyInstructor = ( id ) => async dispatch => {
    await axios.get(`http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/users/${id}/`, {
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
        dispatch(getInstructors(output))
    })
    .catch(err => {
        const info= {
            error:"Failed to fetch instrcutors",
            status:404
        }
        dispatch(setError(info));
    })
}

export const fetchInstructors = () => async dispatch => {
    await axios.get("http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/users/", {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
    })
    .then((res) => {
        const output = []
        let temp;
        res.data.forEach(element => {
            if(element.is_superuser){
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
            error:"Failed to fetch instrcutors",
            status:404
        }
        dispatch(setError(info));
    })
}

export const fetchAccount = ( id ) => async dispatch => {
    await axios.get(`http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/accounts/${id}/`, {
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
        if(err.response.status !== 401)
        {
            dispatch(mountAccount(true));
        }
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
    await axios.post("http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/accounts/", form_data, {
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

export const updateAccount = ( userData, id, accountData ) => async dispatch => {
    const form_data = JSON.stringify(userData)
    await axios.put(`http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/userapi/${id}/`, form_data, {
        headers:{
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        (async () => {
            let account_data = JSON.stringify(accountData)
            console.log(accountData)
            await axios.put(`http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/accounts/${id}/`, account_data, {
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
                    error:"Failed to send",
                    status:404
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        const info= {
            error:"Failed to send",
            status:404
        }
        dispatch(setError(info));
    })
}
