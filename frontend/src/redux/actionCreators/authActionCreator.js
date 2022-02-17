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
            user:res.data,
            status:101
        }
        dispatch(setUser(data));
        if(!res.data.is_superuser){
            dispatch(fetchAccount(res.data.id));
        }
    })
    .catch(err => {   
        localStorage.removeItem('token');
        const info= {
            error:"You are notlogged in ",
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
            user:res.data.user,
            status:res.status
        }
        dispatch(setUser(data));
        localStorage.setItem('token', res.data.token);
        if(!res.data.user.is_superuser){
            dispatch(fetchAccount(res.data.user.id));
        }
        else{
            dispatch(mountAccount(true))
        }
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Invalid username or password",
            status:402
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
            error:err.response.data.username,
            status:403
        }
        dispatch(setError(info))
    });
}

export const setAccount = (data, id) => async dispatch=>{
    const formData = JSON.stringify(data)
    await axios.put(`http://127.0.0.1:8000/userapi/${id}`, formData, {
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
            .catch(err => {
                const info= {
                    error:"Failed to retrieve account",
                    status:404
                }
                dispatch(setError(info))
                dispatch(resetUser());
            });
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
                .catch(err => {
                    const info= {
                        error:"Failed to create account",
                        status:405
                    }
                    dispatch(setError(info))
                    dispatch(resetUser());
                });
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
                .catch(err => {
                    const info= {
                        error:"Failed to update account",
                        status:406
                    }
                    dispatch(setError(info))
                    dispatch(resetUser());
                });
            }
        })()
        dispatch(setUser(user));
    })
    .catch(err => {
        localStorage.removeItem('token');
        const info= {
            error:"Update failed. Refresh Page",
            status:407
        }
        dispatch(setError(info))
        dispatch(resetUser());
    });
}

export const logoutUser = () => dispatch=>{
    localStorage.removeItem('token');
    dispatch(resetUser());
    dispatch(resetAccount())
}

export const confirmUser = () => dispatch => {

}