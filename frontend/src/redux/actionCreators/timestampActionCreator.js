import * as types from "../types/timestampTypes";
import axios from "axios";
import { setError, logoutUser } from "./authActionCreator";


const setTimestamp = ( data ) => ({
    type:types.SET_TIMESTAMP,
    payload:data
})


export const singleFetchTimestamp = () => dispatch => {
    axios.get("http://127.0.0.1:8000/timestamps/", {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
    })
    .then(res => {
        dispatch(setTimestamp(res.data));
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