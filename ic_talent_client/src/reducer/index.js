import { combineReducers } from 'redux';
import CustomerReduer from './customerReduer';
import StoreReducer from './storeReducer';
import PagingReducer from './pagingReducer';

const rootReducer = combineReducers({
    customerReducer: CustomerReduer,
    storeReducer: StoreReducer,
    pagingReducer: PagingReducer
});
export default rootReducer