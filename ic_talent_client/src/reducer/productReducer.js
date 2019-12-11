import * as ProductActions from '../Actions/productAction'
import * as SupportiveActions from '../Actions/constants'

const initialState = {
    products: [],
    product: {},
    productsSlice: [],
    productsIdforDelete: 0,
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
    orderByPriceAEC: false,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10
};

const productReducer = (state, action) => {
    console.log(action, state)
    state = state || initialState
    switch (action.type) {
        case ProductActions.GET_PRODUCTS:
            return { ...state, fetching: true ,insertUpdateModal:false,isInsertMode:false}
        case ProductActions.GET_PRODUCTS_FULFILLED:
            return { ...state, fetching: false, fetched: true, products: action.payload, productSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage) }
        case ProductActions.GET_PRODUCTS_REJECTED:
            return { ...state, fetching: false, apiError: action.payload }
        case ProductActions.POST_PRODUCT:
            return { ...state, insertUpdateModal: true, loading: true, isInsertMode: true, error: action.payload }
        case ProductActions.POST_PRODUCT_SUCCESS:
            return { ...state, insertUpdateModal: false, loading: false, products: action.payload, productSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), error: '' }
        case ProductActions.POST_PRODUCT_ERROR:
            return {}
        case ProductActions.GET_PRODUCT_DETAIL:
            return { ...state, product: {}, productIdforEdit: action.payload, isEditMode: true, insertUpdateModal: true, isInsertMode: false }
        case ProductActions.GET_PRODUCT_DETAIL_FULFILLED:
            return { ...state, product: action.payload, isEditMode: true, productIdforEdit: action.payload.id, insertUpdateModal: true, isInsertMode: false }
        case ProductActions.GET_PRODUCT_DETAIL_REJECTED:
            return {}
        case ProductActions.UPDATE_PRODUCT:
            return { ...state, insertUpdateModal: true, loading: true }
        case ProductActions.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state, insertUpdateModal: false, loading: false, product: {}, products: action.payload, productSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage), isEditMode: false, isInsertMode: true
            }
        case ProductActions.UPDATE_PRODUCT_ERROR:
            return { ...state, insertUpdateModal: true, loading: false, error: action.payload, isEditMode: true, isInsertMode: false }

        case SupportiveActions.PAGING_SET:
            return {
                ...state, firstItemOfThePage: 0, lastItemOfthePage: 10, currentPage: 1, orderByNameAEC: false, orderByPriceAEC: false
            }
        case SupportiveActions.PAGE_CHANGED: {
            return {
                ...state, productSlice: state.products.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage)
            }
        }
        case SupportiveActions.PAGESIZE_DATA_CHANGED:
            return {
                ...state, productSlice: state.products.slice(action.payload.firstItemOfThePage, action.payload.lastItemOfthePage),
                pageSize: action.payload.pageSize, currentPage: action.payload.currentPage,
                firstItemOfThePage: action.payload.firstItemOfThePage, lastItemOfthePage: action.payload.lastItemOfthePage
            }
        case ProductActions.PRODUCT_ORDERBY_NAME:
            return {
                ...state, products: action.payload.products, productSlice: state.products.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByNameAEC: action.payload.orderByNameAEC, currentPage: 1
            }
        case ProductActions.PRODUCT_ORDERBY_PRICE:
            return {
                ...state, products: action.payload.products, productSlice: state.products.slice(state.firstItemOfThePage, state.lastItemOfthePage),
                orderByPriceAEC: action.payload.orderByPriceAEC, currentPage: 1
            }
        case ProductActions.DELETE_PRODUCT:
            return {
                ...state, deleteModal: true, loading: false, IsDeleteMode: true, productIdforDelete: action.payload
            }
        case ProductActions.DELETE_PRODUCT_SUCCESS:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, productIdforDelete: 0, products: action.payload, productSlice: action.payload.slice(state.firstItemOfThePage, state.lastItemOfthePage)
            }
        case ProductActions.DELETE_PRODUCT_ERROR:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, productIdforDelete: 0, error: action.payload,
            }
        case SupportiveActions.DELETE_REQUEST_CANCEL:
            return {
                ...state, deleteModal: false, loading: false, IsDeleteMode: false, ProductsIdforDelete: 0,
            }
        case SupportiveActions.OPEN_MODAL:
            return {
                ...state, isInsertMode: true, insertUpdateModal: true
            }
        case SupportiveActions.CLOSE_MODAL:
            return {
                ...state, isInsertMode: false, Product: {}, isEditMode: false, insertUpdateModal: false,
            }
        default:
            return state;
    }
}
export default productReducer