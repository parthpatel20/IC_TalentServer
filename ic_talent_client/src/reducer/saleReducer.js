import * as SalesActions from '../../src/Actions/salesAction/index'
import * as SupportiveActions from '../Actions/constants';

const initialState = {
    sales: [],
    sale: {},
    salesSlice: [],
    saleIdforDelete: 0,
    saleIdforEdit: 0,
    loading: true,
    fetching: false,
    fetched: false,
    apiError: 'Network Error',
    isEditMode: false,
    isInsertMode: true,
    IsDeleteMode: false,
    insertUpdateModal: false,
    deleteModal: false,
    orderByProductAEC: false,
    orderByStoreAEC: false,
    orderByDateAEC: false,
    orderByCustomerAEC: false,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10,
    orderTypeAEC: false,
    productList: [],
    storeList: [],
    customerList: []
};
const SaleReducer = (state, action) => {
    state = state || initialState
    switch (action.type) {
        case SalesActions.GET_SALES:
            return { ...state, fetching: true ,insertUpdateModal:false,isInsertMode:false}
        case SalesActions.GET_SALES_FULFILLED:
            return { ...state, fetching: false, fetched: true, apiError: null, sales: action.payload, salesSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage) }
        case SalesActions.GET_SALES_REJECTED:
            return { ...state, fetching: false, apiError: action.payload }
        case SalesActions.GET_SALE_DETAIL:
            return { ...state, sale: [], saleIdforEdit: action.payload, isEditMode: true, insertUpdateModal: true, isInsertMode: false }
        case SalesActions.GET_SALE_DETAIL_FULFILLED:
            return { ...state, sale: action.payload, isEditMode: true, saleIdforEdit: action.payload.id, insertUpdateModal: true, isInsertMode: false }
        case SalesActions.POST_SALE:
            return { ...state, insertUpdateModal: true, loading: true, isInsertMode: true }
        case SalesActions.POST_SALE_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, sales: action.payload,
                salesSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                apiError: null
            }
        case SalesActions.UPDATE_SALE:
            return {
                ...state, insertUpdateModal: true, loading: true,
            }
        case SalesActions.UPDATE_SALE_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, sale: [], sales: action.payload, salesSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), isEditMode: false, isInsertMode: true
            }
        case SalesActions.UPDATE_SALE_ERROR:
            return {
                ...state, insertUpdateModal: true, loading: false, error: action.payload, isEditMode: true, isInsertMode: false
            }

        case SalesActions.SALE_ORDERBY_CUSTOMER:
            return {
                ...state, sales: action.payload.sales, salesSlice: action.payload.sales.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByCustomerAEC: action.payload.orderByCustomerAEC, currentPage: 1
            }
        case SalesActions.SALE_ORDERBY_PRODUCT:
            return {
                ...state, sales: action.payload.sales, salesSlice: action.payload.sales.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByProductAEC: action.payload.orderByProductAEC, currentPage: 1
            }
        case SalesActions.SALE_ORDERBY_STORE:
            return {
                ...state, sales: action.payload.sales, salesSlice: action.payload.sales.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByStoreAEC: action.payload.orderByStoreAEC, currentPage: 1
            }
        case SalesActions.SALE_ORDERBY_DATE:
            return {
                ...state, sales: action.payload.sales, salesSlice: action.payload.sales.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByDateAEC: action.payload.orderByDateAEC, currentPage: 1
            }
        case SupportiveActions.PAGING_SET:
            return {
                ...state, firstItemOfThePage: 0, lastItemOfthePage: 10, currentPage: 1, orderByNameAEC: false, orderByAddressAEC: false
            }
       case SupportiveActions.PAGE_CHANGED: {
                return {
                    ...state, salesSlice: state.sales.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage)
                }
            }
        case SupportiveActions.PAGESIZE_DATA_CHANGED:
            return {
                ...state, salesSlice: state.sales.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage),
                pageSize: action.payload.pageSize, currentPage: action.payload.currentPage,
                firstItemOfThePage: action.payload.firstItemOfThePage, lastItemOfthePage: action.payload.lastItemOfthePage
            }
        case SalesActions.DELETE_SALE:
            return {
                ...state, deleteModal: true, IsDeleteMode: true, saleIdforDelete: action.payload
            }
        case SalesActions.DELETE_SALE_SUCCESS:
            return {
                ...state, deleteModal: false, IsDeleteMode: false, saleIdforDelete: 0, sales: action.payload, salesSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case SalesActions.DELETE_SALE_ERROR:
            return {
                ...state, deleteModal: false, IsDeleteMode: false, saleIdforDelete: 0, error: action.payload,
            }
        case SupportiveActions.DELETE_REQUEST_CANCEL:
            return {
                ...state, deleteModal: false, IsDeleteMode: false, saleIdforDelete: 0,
            }
        case SupportiveActions.OPEN_MODAL:
            return {
                ...state, isInsertMode: true, insertUpdateModal: true
            }
        case SupportiveActions.CLOSE_MODAL:
            return {
                ...state, isInsertMode: false, sale: {}, isEditMode: false, insertUpdateModal: false,
            }
        case SalesActions.PRODUCT_LIST:
            return {
                ...state, productList: action.payload
            }
        case SalesActions.STORE_LIST:
            return {
                ...state, storeList: action.payload
            }
        case SalesActions.CUSTOMER_LIST:
            return {
                ...state, customerList: action.payload, loading: false
            }
        default:
            return state
    }
}
export default SaleReducer;