import { SET_TIMESTAMP } from "../types/timestampTypes"

const initialState = {
    timestamps:null,
}

const timestampReducer = (state=initialState, {type, payload})=>{
    switch(type){

        case SET_TIMESTAMP:     
            state={...state,
                timestamps:payload
            }
            return state;

        default:
            return state;
    }
}
 
export default timestampReducer;