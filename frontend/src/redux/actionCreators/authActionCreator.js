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

export const checkUser = () => dispatch=>{
    axios.get('http://127.0.0.1:8000/currentuser/', {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(res => {
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


export const loginUser = (data) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.post("http://127.0.0.1:8000/auth/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        const data = {
            user:res.data.user,
            status:res.status
        }
        dispatch(setUser(data))
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
    axios.post("http://127.0.0.1:8000/createuser/", formData, {
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
            error:"Registration failed",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser());
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
        (async () => {
            let acc = await axios.get(`http://127.0.0.1:8000/accounts/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            })
            if(!acc){
                const temp = {
                    user:id,
                    section:data.section,
                    instructor:data.instructor,
                    team:data.team,
                }
                const accData = JSON.stringify(temp);
                axios.post('http://127.0.0.1:8000/accounts/', accData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    },
                })
            }
            else{
                const temp = {
                    section:data.section,
                    instructor:data.instructor,
                    team:data.team,
                }
                const accData = JSON.stringify(temp);
                axios.put(`http://127.0.0.1:8000/accounts/${id}`, accData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `JWT ${localStorage.getItem('token')}`,
                    },
                })
            }
        })()
        dispatch(setUser(user));
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

export const confirmUser = () => dispatch => {

}