import { ADD_ACCOUNT, SET_ACCOUNT, RESET_ACCOUNT, IS_SET, GET_INSTRUCTORS, GET_MY_INSTRUCTOR } from "../types/accountTypes"

const initialState = {
    instructors:null,
    myInstructor:null,
    data:null,
    mounted:false,
}

const accountReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case SET_ACCOUNT:     
            state={...state,
                data:payload,
                set:true,
                mounted:true,
            }
            return state;
        case RESET_ACCOUNT:
            state=initialState;
            return state;
        case IS_SET:
            state={...state, 
                mounted:payload,
            }
            return state;
        case GET_INSTRUCTORS:
            state={...state, 
                instructors:payload,
            }
            return state;
        case GET_MY_INSTRUCTOR:
            state={...state, 
                myInstructor:payload,
            }
            return state;
        default:
            return state;
    }
}
 
export default accountReducer;