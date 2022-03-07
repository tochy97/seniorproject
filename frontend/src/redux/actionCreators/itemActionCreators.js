import * as types from "../types/itemTypes";
import { setError, logoutUser } from "./authActionCreator";
import axios from 'axios';

export const setLoading = ( data ) => ({
    type:types.SET_LOADING,
    payload:data,
})
const setItem = ( data ) => ({
    type:types.SET_ITEM,
    payload:data
})
const addItem = ( data ) => ({
    type:types.ADD_ITEM,
    payload:data
})
const resetItem = () => ({
    type:types.RESET_ITEM,
})
const deleteItem = ( data ) => ({
    type:types.DELETE_ITEM,
    payload:data,
})

// export const createItem = (data, id) => dispatch=>{
//     const formData = JSON.stringify(data)

//     console.log(formData)
// }

export const createItem = (data, id)  => dispatch => {
    // const formData = JSON.stringify(data)
    const formData = JSON.stringify({
    // const formData = {
        "name": data.name,
        "type": data.type,
        "description": data.description,
        "total": 1,
        "out": 0,
        "available": 1,
        "ser_no": data.ser_no,
        "image": data.image})
    // }

    // console.log(formData['name'])

    axios.post("http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/items/", formData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
    })
    .catch(err => {
        if(err.response.status === 401)
        {
            const info= {
                error:"Session expired. Refresh Page",
                status:err.response.status
            }
            dispatch(setError(info))
            dispatch(logoutUser());
        }
    })

    console.log(formData)

    // dispatch(reset('AddItem'));
  };

export const doItem = ( data, item, setProgress ) => dispatch => {

}

export const fetchItems = () => dispatch => {
    dispatch(setLoading(true));
    axios.get("http://SeniorDesign-env.eba-itcpbav3.us-west-2.elasticbeanstalk.com/items/", {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
    })
    .then(res => {
        dispatch(setItem(res.data));
        dispatch(setLoading(false))
    })
    .catch(err => {
        if(err.response.status === 401)
        {
            const info= {
                error:"Session expired. Refresh Page",
                status:err.response.status
            }
            dispatch(setError(info))
            dispatch(logoutUser());
        }
    })
}

export const removeItem = ( id ) => dispatch => {
    
}