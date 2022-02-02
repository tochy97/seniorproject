import { ADD_CLASS, ADD_SECTION, SET_CLASS, DELETE_CLASS, RESET_CLASS } from "../types/sectionTypes"

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
            const current = state.classes.find(cla=>cla.id === payload.classID)
            console.log("current: " + current)
            current.sections = payload.data
            console.log("payload: " + payload.data)
            state={
                classes:state.classes.map(cla=>cla.id === payload.classID? current : cla)
            }
            return state;
        case SET_CLASS:     
            state={...state,
                classes:payload,
                mounted:true
            }
            return state;
        case RESET_CLASS:
            state=initialState;
            return state;
        case DELETE_CLASS:
            return state;
        default:
            return state;
    }
}
 
export default sectionReducer;