
import * as StoreActionList from '../../src/Actions/storeAction/index'
import * as SupportiveActionList from '../Actions/constants';
const initialState = {
    stores: [],
    store: {},
    storesSlice: [],
    storesIdforDelete: 0,
    loading: false,
    fetching: false,
    fetched: false,
    apiError: 'Network Error',
    isEditMode: false,
    isInsertMode: true,
    IsDeleteMode: false,
    insertUpdateModal: false,
    deleteModal: false,
    orderByNameAEC: false,
    orderByAddressAEC: false,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10
};
const StoreReducer = (state, action) => {
    console.log(action, state)
    state = state || initialState
    switch (action.type) {
        case StoreActionList.GET_STORES:
            return { ...state, fetching: true }
        case StoreActionList.GET_STORES_FULFILLED:
            return { ...state, fetching: false, fetched: true, stores: action.payload, storeSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage) }
        case StoreActionList.GET_STORES_REJECTED:
            return { ...state, fetching: false, apiError: action.payload }
        case StoreActionList.POST_STORE:
            return { ...state, insertUpdateModal: true, loading: true, isInsertMode: true, error: action.payload }
        case StoreActionList.POST_STORE_SUCCESS:
            return { ...state, insertUpdateModal: false, loading: false, stores: action.payload, error: '' }
        case StoreActionList.POST_STORE_ERROR:
            return {}
        case StoreActionList.GET_STORE_DETAIL:
            return { ...state, store: {}, storeIdforEdit: action.payload, isEditMode: true, insertUpdateModal: true, isInsertMode: false }
        case StoreActionList.GET_STORE_DETAIL_FULFILLED:
            return { ...state, store: action.payload, isEditMode: true, storeIdforEdit: action.payload.id, insertUpdateModal: true, isInsertMode: false }
        case StoreActionList.GET_STORE_DETAIL_REJECTED:
            return {}
        case StoreActionList.UPDATE_STORE:
            return { ...state, insertUpdateModal: true, loading: true }
        case StoreActionList.UPDATE_STORE_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, store: {}, stores: action.payload, storeSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), isEditMode: false, isInsertMode: true
            }
        case StoreActionList.UPDATE_STORE_ERROR:
            return { ...state, insertUpdateModal: true, loading: false, error: action.payload, isEditMode: true, isInsertMode: false }
        case SupportiveActionList.PAGING_SET:
            return {
                ...state, firstItemOfThePage: 0, lastItemOfthePage: 10, currentPage: 1, orderByNameAEC: false, orderByAddressAEC: false
            }
        case SupportiveActionList.PAGE_CHANGED: {
            return {
                ...state, storeSlice: state.stores.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage)
            }
        }
        case SupportiveActionList.PAGESIZE_DATA_CHANGED:
            return {
                ...state, storeSlice: state.stores.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage),
                pageSize: action.payload.pageSize, currentPage: action.payload.currentPage,
                firstItemOfThePage: action.payload.firstItemOfThePage, lastItemOfthePage: action.payload.lastItemOfthePage
            }
        case StoreActionList.STORE_ORDERBY_NAME:
            return {
                ...state, stores: action.payload.stores, storeSlice: state.stores.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByNameAEC: action.payload.orderByNameAEC, currentPage: 1,
            }
        case StoreActionList.STORE_ORDERBY_ADDRESS:
            return {
                ...state, stores: action.payload.stores, storeSlice: state.stores.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByAddressAEC: action.payload.orderByAddressAEC, currentPage: 1,
            }
        case StoreActionList.DELETE_STORE:
            return {
                ...state, deleteModal: true, loading: false, IsDeleteMode: true, storesIdforDelete: action.payload
            }
        case StoreActionList.DELETE_STORE_SUCCESS:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, storeIdforDelete: 0, stores: action.payload, storeSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case StoreActionList.DELETE_STORE_ERROR:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, storeIdforDelete: 0, error: action.payload,
            }
        case SupportiveActionList.DELETE_REQUEST_CANCEL:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, storesIdforDelete: 0,
            }
        case SupportiveActionList.OPEN_MODAL:
            return {
                ...state, isInsertMode: true, insertUpdateModal: true
            }
        case SupportiveActionList.CLOSE_MODAL:
            return {
                ...state, isInsertMode: false, store: {}, isEditMode: false, insertUpdateModal: false,
            }
        default: return state
    }
}
export default StoreReducer;