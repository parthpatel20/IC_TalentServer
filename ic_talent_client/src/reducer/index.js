import { combineReducers } from 'redux';
import CustomerReduer from './customerReduer';
import StoreReducer from './storeReducer';
import PagingReducer from './pagingReducer';
import ProductReducer from './productReducer';

const rootReducer = combineReducers({
    customerReducer: CustomerReduer,
    storeReducer: StoreReducer,
    pagingReducer: PagingReducer,
    productReducer: ProductReducer
});
export default rootReducer