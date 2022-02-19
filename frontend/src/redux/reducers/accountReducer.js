import { ADD_ACCOUNT, SET_ACCOUNT, RESET_ACCOUNT, DELETE_ACCOUNT, IS_SET, GET_INSTRUCTORS } from "../types/accountTypes"

const initialState = {
    instructors:null,
    data:null,
    mounted:false,
}

const accountReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case ADD_ACCOUNT:
            state={
                data:[...state.data,payload]
            }
            return state;
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
        case DELETE_ACCOUNT:
            const filteredData = state.data.filter(i=> i.id !== payload);
            state={...state,
                data:filteredData,
            }
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
        default:
            return state;
    }
}
 
export default accountReducer;