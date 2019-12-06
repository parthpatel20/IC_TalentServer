import { combineReducers } from 'redux';
import CustomerReduer from './customerReduer';
import StoreReducer from './storeReducer';
import PagingReducer from './pagingReducer';
import ProductReducer from './productReducer';
import SaleReducer from './saleReducer';

const rootReducer = combineReducers({
    customerReducer: CustomerReduer,
    storeReducer: StoreReducer,
    pagingReducer: PagingReducer,
    productReducer: ProductReducer,
    saleReducer: SaleReducer
});
export default rootReducer