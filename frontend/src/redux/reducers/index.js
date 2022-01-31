import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer"
import accountReducer from "./accountReducer"

const rootReducer = combineReducers({
    auth:authReducer,
    item:itemReducer,
    account:accountReducer
});

export default rootReducer;