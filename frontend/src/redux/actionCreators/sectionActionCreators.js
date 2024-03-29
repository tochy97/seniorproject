import * as types from "../types/sectionTypes";
import { setError } from "./authActionCreator";
import axios from 'axios';

const addClass = ( data ) => ({
    type:types.ADD_CLASS,
    payload:data
})
const setClass = ( data ) => ({
    type:types.SET_CLASS,
    payload:data
})

export const fetchClass = () => async dispatch => {
    await axios.get("http://127.0.0.1:8000/classes/", {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        
        dispatch(setClass(res.data));
    })
    .catch(err => {
        const info= {
            error:"Failed to retrieve classes",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}

export const createClass = ( classNum, id ) => async dispatch => {
    let form_data = new FormData();
    form_data.append('instructor', id);
    form_data.append('number', classNum);
    await axios.post("http://127.0.0.1:8000/classes/", form_data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        dispatch(addClass(res.data));
    })
    .catch(err => {
        const info= {
            error:"Failed to create class",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}

export const removeClass = ( classID ) => async dispatch => {
    await axios.delete(`http://127.0.0.1:8000/classes/${classID}/`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(() => {
        (async () => {
            await axios.get("http://127.0.0.1:8000/classes/", {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((res) => {
                dispatch(addClass(res.data));
            })
            .catch(err => {
                const info= {
                    error:"Failed to update class list",
                    status:err.response.status
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        const info= {
            error:"Failed to delete class",
            status:err.response.status
        }
        dispatch(setError(info));
    })
}

export const editClass = ( classID, newNumber ) => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/classes/${classID}/`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        (async () => {
            let form_data = new FormData();
            form_data.append('instructor', res.data.instructor);
            form_data.append('number', newNumber);
            await axios.put(`http://127.0.0.1:8000/classes/${classID}/`, form_data, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(() => {
                (async () => {
                    await axios.get("http://127.0.0.1:8000/classes/", {
                        headers:{
                            'Content-Type': 'application/json',
                            Authorization: `JWT ${localStorage.getItem('token')}`,
                        }
                    })
                    .then((res) => {
                        dispatch(addClass(res.data));
                    })
                    .catch(err => {
                        const info= {
                            error:"Failed to reload",
                            status:err.response.status
                        }
                        dispatch(setError(info));
                    })
                })()
            })
            .catch(err => {
                const info= {
                    status:err.response.status,
                    error:"Failed to update class number",
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        const info= {
            status:err.response.status,
            error:"Failed to load class for update",
        }
        dispatch(setError(info));
    })
}

export const createSection = ( classID, secNum, id, classNum ) => async dispatch => {
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        for (let i = 0; i < str.length; i++){
            if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
                return false;
            }
        }
        return true;
    }

    await axios.get(`http://127.0.0.1:8000/classes/${classID}/`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        let current = res.data.sections
        let output = ""
        if(current)
        {
            for (let i = 0; i < current.length; i++) {
                if(isNumeric(current[i]) && current[i] !== ' '){
                    output += current[i];
                    output += ", "
                }
            }
        }
        output += secNum

        let form_data = new FormData();
        form_data.append('instructor', id);
        form_data.append('sections', output);
        form_data.append('number', classNum);
        (async () => {
            await axios.put(`http://127.0.0.1:8000/classes/${classID}/`, form_data, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(() => {
                (async () => {
                    await axios.get("http://127.0.0.1:8000/classes/", {
                        headers:{
                            'Content-Type': 'application/json',
                            Authorization: `JWT ${localStorage.getItem('token')}`,
                        }
                    })
                    .then((res) => {
                        dispatch(addClass(res.data));
                    })
                    .catch(err => {
                        const info= {
                            error:"Failed to reload",
                            status:err.response.status
                        }
                        dispatch(setError(info));
                    })
                })()
            })
            .catch(err => {
                const info= {
                    status:err.response.status,
                    error:"Failed to create section",
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        const info= {
            status:err.response.status,
            error:"Failed to load class for update",
        }
        dispatch(setError(info));
    })

}

export const editSection = ( clas ) => async dispatch => {
    let form_data = new FormData();
    form_data.append('instructor', clas.instructor);
    form_data.append('number', clas.number);
    form_data.append('sections', clas.sections);
    await axios.put(`http://127.0.0.1:8000/classes/${clas.id}/`, form_data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then(() => {
        (async () => {
            await axios.get("http://127.0.0.1:8000/classes/", {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((res) => {
                dispatch(addClass(res.data));
            })
            .catch(err => {
                const info= {
                    error:"Failed to reload",
                    status:err.response.status
                }
                dispatch(setError(info));
            })
        })()
    })
    .catch(err => {
        console.log(err)
        const info= {
            status:err.response.status,
            error:"Failed to update class number",
        }
        dispatch(setError(info));
    })
}