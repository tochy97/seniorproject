import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer"
import accountReducer from "./accountReducer"
import sectionReducer from "./sectionReducer"
import timestampReducer from './timestampReducer'

const rootReducer = combineReducers({
    auth:authReducer,
    item:itemReducer,
    account:accountReducer,
    section:sectionReducer,
    timestamp:timestampReducer
});

export default rootReducer;