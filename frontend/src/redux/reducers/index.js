import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer"
import accountReducer from "./accountReducer"
import sectionReducer from "./sectionReducer"

const rootReducer = combineReducers({
    auth:authReducer,
    item:itemReducer,
    account:accountReducer,
    section:sectionReducer
});

export default rootReducer;