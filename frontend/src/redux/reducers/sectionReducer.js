import { ADD_CLASS, SET_CLASS } from "../types/sectionTypes"

const initialState = {
    classes:null,
    sections:null,
    mounted:false,
}

const sectionReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case ADD_CLASS:
            state={
                classes:[...state.classes,payload]
            }
            return state;
        case SET_CLASS:     
            state={...state,
                classes:payload,
                mounted:true
            }
            return state;
        default:
            return state;
    }
}
 
export default sectionReducer;