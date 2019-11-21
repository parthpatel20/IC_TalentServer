import * as CustomerActionList from '../Actions/customerAction/index'
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
    isInsertMode: true,
    IsDeleteMode: false,
    insertUpdateModal: false,
    deleteModal: false,
    customerPerPage: 10,
    currerntPage: 1,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10,
    orderByNameAEC: false,
    orderByAddressAEC: false,
}

const CustomerReducer = (state, action) => {
    state = state || initialState;
    console.log(action, state);
    switch (action.type) {
        case CustomerActionList.GET_CUSTOMERS:
            return { ...state, fetching: true }
        case CustomerActionList.GET_CUSTOMERS_FULFILLED:
            return { ...state, fetching: false, fetched: true, customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage) }
        case CustomerActionList.GET_CUSTOMERS_REJECTED:
            return { ...state, fetching: false, apiError: action.payload }

        case CustomerActionList.GET_CUSTOMER_DETAIL:
            return { ...state, customer: [], customerIdforEdit: action.payload, isEditMode: true, insertUpdateModal: true, isInsertMode: false }

        case CustomerActionList.GET_CUSTOMER_DETAIL_FULFILLED:
            return { ...state, customer: action.payload, isEditMode: true, customerIdforEdit: action.payload.id, insertUpdateModal: true, isInsertMode: false }
        case CustomerActionList.POST_CUSTOMER:
            return { ...state, insertUpdateModal: true, loading: true, isInsertMode: true, error: action.payload }
        case CustomerActionList.POST_CUSTOMER_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, customers: action.payload, error: action.payload
            }
        case CustomerActionList.UPDATE_CUSTOMER:
            return {
                ...state, insertUpdateModal: true, loading: true,
            }
        case CustomerActionList.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, customer: [], customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), isEditMode: false, isInsertMode: true
            }
        case CustomerActionList.UPDATE_CUSTOMER_ERROR:
            return {
                ...state, insertUpdateModal: true, loading: false, error: action.payload, isEditMode: true, isInsertMode: false
            }
        case CustomerActionList.DELETE_CUSTOMER:
            return {
                ...state, deleteModal: true, loading: false, IsDeleteMode: true, customerIdforDelete: action.payload
            }
        case CustomerActionList.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '', customers: action.payload, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case CustomerActionList.DELETE_CUSTOMER_ERROR:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '', error: action.payload,
            }
        case CustomerActionList.DELETE_CUSTOMER_CANCEL:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, customerIdforDelete: '',
            }
        case CustomerActionList.PAGING_SET:
            return {
                ...state, customerSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case CustomerActionList.PAGE_CHANGED: return {
            ...state, customerSlice: state.customers.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage), firstItemOfThePage: action.payload.firstItemOfThePage,
            lastItemOfthePage: action.payload.lastItemOfthePage,
            currerntPage: action.payload.currerntPage
        }
        case CustomerActionList.PAGESIZE_DATA_CHANGED:
            return {
                ...state, customerPerPage: action.payload.customerPerPage, customerSlice: state.customers.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage), firstItemOfThePage: action.payload.firstItemOfThePage,
                lastItemOfthePage: action.payload.lastItemOfthePage
            }
        case CustomerActionList.OPEN_MODAL:
            return {
                ...state, isInsertMode: true, insertUpdateModal: true
            }
        case CustomerActionList.CLOSE_MODAL:
            return {
                ...state, isInsertMode: false, customer: [], isEditMode: false, insertUpdateModal: false,
            }
        case CustomerActionList.ORDERBY_NAME:
            return {
                ...state, customers: action.payload.customers, orderByNameAEC: action.payload.orderByNameAEC,
                customerSlice: action.payload.customers.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case CustomerActionList.ORDERBY_ADDRESS:
            return {
                ...state, customers: action.payload.customers, orderByAddressAEC: action.payload.orderByAddressAEC,
                customerSlice: action.payload.customers.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        default:
            return state;
    }
}

export default CustomerReducer;