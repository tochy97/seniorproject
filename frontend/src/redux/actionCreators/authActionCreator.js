import * as types from "../types/authTypes";
import axios from 'axios';
import { fetchAccount, mountAccount, resetAccount } from "./accountActionCreators";


const setUser = (data)=>({
    type:types.SET_USER,
    payload:data
})
export const setError = (data)=>({
    type:types.SET_ERROR,
    payload:data
})
const resetUser = ()=>({
    type:types.RESET_USER,
})
export const setMount = (data)=>({
    type:types.SET_MOUNT,
    payload:data
})
export const setAllowed = (data)=>({
    type:types.SET_ALLOWED,
    payload:data
})

export const checkUser = ()  => async dispatch=>{
    await axios.get('http://127.0.0.1:8000/currentuser/', {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(res => {
        const data = {
            user:{
                id:res.data.id,
                first_name:res.data.first_name,
                last_name:res.data.last_name,
                email:res.data.email,
                admin:res.data.is_staff,
            },
            status:101
        }
        dispatch(setUser(data));
        if(!res.data.is_staff){
            dispatch(fetchAccount(res.data.id));
        }
    })
    .catch(err => {   
        localStorage.removeItem('token');
        const info= {
            error:"You are not logged in",
            status:401
        }
        dispatch(setError(info))
    }); 
}


export const loginUser = (data) => async dispatch=>{
    const formData = JSON.stringify(data)
    await axios.post("http://127.0.0.1:8000/auth/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        const data = {
            user:{
                id:res.data.user.id,
                first_name:res.data.user.first_name,
                last_name:res.data.user.last_name,
                email:res.data.user.email,
                admin:res.data.user.is_staff,
            },
            status:101
        }
        dispatch(setUser(data));
        localStorage.setItem('token', res.data.token);
        if(!res.data.user.is_staff){
            dispatch(fetchAccount(res.data.user.id));
        }
        else{
            dispatch(mountAccount(true))
        }
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Failed to login",
            status:err.response.status
        }
        dispatch(setError(info))
    });
}

export const createUser = (data) =>  async dispatch=>{
    const formData = JSON.stringify(data)
    await axios.post("http://127.0.0.1:8000/createuser/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch(checkUser());
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Failed to register",
            status:err.response.status
        }
        dispatch(setError(info))
    });
}

export const logoutUser = () => dispatch=>{
    localStorage.removeItem('token');
    dispatch(resetUser());
    dispatch(resetAccount())
}

export const updateUser = ( data, id ) => async dispatch => {
    const form_data = JSON.stringify(data)
    await axios.put(`http://127.0.0.1:8000/userapi/${id}/`, form_data, {
        headers:{
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    })
    .then(() => {
        dispatch(checkUser());
    })
    .catch(err => {
        const info= {
            error:"Failed to update",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}