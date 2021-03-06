import * as CustomerActions from '../Actions/customerAction/index'
const initialState = {
    customers: [],
    customer: [],
    customerSlice: [],
    customerIdforDelete: 0,
    loading: false,
    fetching: false,
    fetched: false,
    apiError: 'Network Error',
    isEditMode: false,
    isInsertMode: false,
    IsDeleteMode: false,
    insertUpdateModal: false,
    deleteModal: false,
    customerPerPage: 10,
    currentPage: 1,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10,
    orderByNameAEC: false,
    orderByAddressAEC: false
}

const CustomerReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case CustomerActions.GET_CUSTOMERS:
            return { ...state, fetching: true ,insertUpdateModal:false,isInsertMode:false}
        case CustomerActions.GET_CUSTOMERS_FULFILLED:
            return { ...state, fetching: false, fetched: true, customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage) }
        case CustomerActions.GET_CUSTOMERS_REJECTED:
            return { ...state, fetching: false, apiError: action.payload }
        case CustomerActions.GET_CUSTOMER_DETAIL:
            return { ...state, customer: [], customerIdforEdit: action.payload, isEditMode: true, insertUpdateModal: true, isInsertMode: false }
        case CustomerActions.GET_CUSTOMER_DETAIL_FULFILLED:
            return { ...state, customer: action.payload, isEditMode: true, customerIdforEdit: action.payload.id, insertUpdateModal: true, isInsertMode: false }
        case CustomerActions.POST_CUSTOMER:
            return { ...state, insertUpdateModal: true, loading: true, isInsertMode: true, error: action.payload }
        case CustomerActions.POST_CUSTOMER_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, customers: action.payload,
                customerSlice:action.payload.slice(state.firstItemOfThePage,state.lastItemOfthePage),error: action.payload
            }
        case CustomerActions.UPDATE_CUSTOMER:
            return {
                ...state, insertUpdateModal: true, loading: true,
            }
        case CustomerActions.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, customer: [], customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), isEditMode: false, isInsertMode: true
            }
        case CustomerActions.UPDATE_CUSTOMER_ERROR:
            return {
                ...state, insertUpdateModal: true, loading: false, error: action.payload, isEditMode: true, isInsertMode: false
            }
        case CustomerActions.DELETE_CUSTOMER:
            return {
                ...state, deleteModal: true, loading: false, IsDeleteMode: true, customerIdforDelete: action.payload
            }
        case CustomerActions.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '', customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case CustomerActions.DELETE_CUSTOMER_ERROR:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '', error: action.payload,
            }
        case CustomerActions.DELETE_CUSTOMER_CANCEL:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '',
            }
        case CustomerActions.PAGING_SET:
            return {
                ...state, firstItemOfThePage: 0,
                lastItemOfthePage: 10,
                currentPage: 1
            }
        case CustomerActions.PAGE_CHANGED: return {
            ...state, customerSlice: state.customers.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage), firstItemOfThePage: action.payload.firstItemOfThePage,
            lastItemOfthePage: action.payload.lastItemOfthePage,
            currentPage: action.payload.currentPage
        }
        case CustomerActions.PAGESIZE_DATA_CHANGED:
            return {
                ...state, customerPerPage: action.payload.customerPerPage, customerSlice: state.customers.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage), firstItemOfThePage: action.payload.firstItemOfThePage,
                lastItemOfthePage: action.payload.lastItemOfthePage, currentPage: 1
            }
        case CustomerActions.OPEN_MODAL:
            return {
                ...state, isInsertMode: true, insertUpdateModal: true
            }
        case CustomerActions.CLOSE_MODAL:
            return {
                ...state, isInsertMode: false, customer: [], isEditMode: false, insertUpdateModal: false,
            }
        case CustomerActions.CUSTOMER_ORDERBY_NAME:
            return {
                ...state, customers: action.payload.customers, orderByNameAEC: action.payload.orderByNameAEC,
                customerSlice: action.payload.customers.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case CustomerActions.CUSTOMER_ORDERBY_ADDRESS:
            return {
                ...state, customers: action.payload.customers, orderByAddressAEC: action.payload.orderByAddressAEC,
                customerSlice: action.payload.customers.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        default:
            return state;
    }
}

export default CustomerReducer;