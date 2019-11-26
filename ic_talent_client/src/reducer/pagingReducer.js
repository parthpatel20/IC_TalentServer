import * as PagingActions from '../Actions/constants'
import * as StoreActionList from '../Actions/storeAction'
const initialState = {
    pageSize: 10,
    currentPage: 1,
    firstItemOfThePage: 0,
    lastItemOfthePage: 10
}
const PagingReducer = (state, action) => {
    state = state || initialState;
    console.log(action, state)
    switch (action.type) {
        case PagingActions.PAGING_SET:
            return {
                ...state, firstItemOfThePage: 0,
                lastItemOfthePage: 10,
                currentPage: 1,
                pageSize: 10
            }
        case PagingActions.PAGE_CHANGED:
            return {
                ...state, firstItemOfThePage: action.payload.firstItemOfThePage,
                lastItemOfthePage: action.payload.lastItemOfthePage,
                currentPage: action.payload.currentPage
            }
        case PagingActions.PAGESIZE_DATA_CHANGED:
            return {
                ...state, pageSize: action.payload.pageSize, currentPage: action.payload.currentPage,
                firstItemOfThePage: action.payload.firstItemOfThePage, lastItemOfthePage: action.payload.lastItemOfthePage
            }

        case StoreActionList.STORE_ORDERBY_NAME:
            return {
                ...state, pageSize: action.payload.pageSize, currentPage: 1,
            }
        case StoreActionList.STORE_ORDERBY_ADDRESS:
            return {
                ...state, pageSize: action.payload.pageSize, currentPage: 1
            }
        default:
            return state;
    }
}

export default PagingReducer;