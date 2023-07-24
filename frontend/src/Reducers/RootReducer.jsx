import { combineReducers } from "redux";
import loginSlice from './LoginReducer'
import registerSlice from './CreateInternReducer'


const rootReducer = combineReducers({
    login : loginSlice,
    create : registerSlice,

})


export default rootReducer;