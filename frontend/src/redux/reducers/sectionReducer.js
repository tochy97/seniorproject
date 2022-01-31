import { ADD_CLASS, ADD_SECTION, SET_CLASS, SET_SETCTION, DELETE_CLASS, DELETE_SECTION, RESET_CLASS, RESET_SECTION, JOIN_SECTION } from "../types/sectionTypes"

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
        case ADD_SECTION:
            state={
                sections:[...state.sections,payload]
            }
            return state;
        case SET_CLASS:     
            state={...state,
                classes:payload,
                mounted:true,
            }
            return state;
        case SET_SETCTION:     
            state={...state,
                sections:payload,
                mounted:true,
            }
            return state;
        case RESET_CLASS:
            state=initialState;
            return state;
        case RESET_SECTION:
            state=initialState;
            return state;
        case DELETE_CLASS:
            return state;
        case DELETE_SECTION:
            return state;
        case JOIN_SECTION:
            return state;
        default:
            return state;
    }
}
 
export default sectionReducer;