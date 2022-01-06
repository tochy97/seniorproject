import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer"

const rootReducer = combineReducers({
    auth:authReducer,
    item:itemReducer,
});

export default rootReducer;