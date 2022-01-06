import { SET_LOADING, ADD_ITEM, SET_ITEM, RESET_ITEM, DELETE_ITEM, CHECKOUT_ITEM, RETURN_ITEM } from "../types/itemTypes"

const initialState = {
    isLoading:true,
    items:null,
}

const itemReducers = (state=initialState, {type, payload})=>{
    switch(type){
        case SET_LOADING:
            state={ ...state,
                isLoading: payload,
                items: null,
            }
            return state;
        case ADD_ITEM:
            state={
                items:[...state.items,payload]
            }
            return state;
        case SET_ITEM:     
            state={...state,
                items:payload
            }
            return state;
        case RESET_ITEM:
            state=initialState;
            return state;
        case DELETE_ITEM:
            const filteredItems = state.items.filter(i=> i.id !== payload);
            state={
                ...state,items:filteredItems,
            }
            return state;
        case CHECKOUT_ITEM:
            state={
                
            }
            return state;
        case RETURN_ITEM:
            state={
                
            }
            return state;
        default:
            return state;
    }
}
 
export default itemReducers;