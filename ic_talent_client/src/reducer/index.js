import { combineReducers } from 'redux';
import CustomerReduer from './customerReduer';

const rootReducer = combineReducers({
    customerReducer: CustomerReduer
});
export default rootReducer