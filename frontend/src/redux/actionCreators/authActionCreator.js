import * as types from "../types/authTypes";
import axios from 'axios';

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

export const loginUser = (data) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.post("http://127.0.0.1:8000/auth/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        console.log(res)
        const data = {
            user:res.data.user,
            status:res.status
        }
        dispatch(setUser(data))
        console.log(localStorage.getItem('token'))
        localStorage.setItem('token', res.data.token);
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Invalid username or password",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser);
    });
}

export const createUser = (data) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.post("http://127.0.0.1:8000/userapi/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        const user = {
            username:res.data.username,
            status:res.status
        }
        dispatch(setUser(user));
        const info= {
            error:"Refresh page",
        }
        dispatch(setError(info))
        localStorage.setItem('token', res.data.token);
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Registration failed",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser());
    });
}

export const checkUser = () => dispatch=>{
    axios.get('http://127.0.0.1:8000/currentuser/', {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(res => {
        console.log("here")
        const data = {
            user:res.data,
            status:200
        }
        dispatch(setUser(data))
    })
    .catch(err => {   
        localStorage.removeItem('token');
        const info= {
            error:"You are notlogged in ",
            status:err.response.status
        }
        dispatch(setError(info))
    }); 
}

export const setAccount = (data, id) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.put(`http://127.0.0.1:8000/userapi/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        },
    })
    .then(res => {
        const user = {
            username:res.data.user.username,
            id:res.data.user.id,
            status:res.status
        }
        dispatch(setUser(user))
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Update failed. Refresh Page",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser());
    });
}

export const logoutUser = () => dispatch=>{
    localStorage.removeItem('token');
    dispatch(resetUser());
}