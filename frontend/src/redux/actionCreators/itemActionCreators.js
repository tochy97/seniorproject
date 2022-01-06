import * as types from "../types/itemTypes";
import axios from 'axios';

const setLoading = ( data ) => ({
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

export const doItem = ( data, item, setProgress ) => dispatch => {

}

export const fetchItems = () => dispatch => {
    dispatch(setLoading(true));
    axios.get("http://127.0.0.1:8000/items/", {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
    })
    .then(res => {
        dispatch(setItem(res.data));
    })
}

export const removeItem = ( id ) => dispatch => {
    
}