import * as ApiRequest from './constants';

export const checkEnviroment = () => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        ? ApiRequest.DEV_ROOT : ApiRequest.PRODUCTION_ROOT;
}

export const pageChanged = (pageChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: ApiRequest.PAGE_CHANGED, payload: pageChangedProps
        })
    }
}

export const deleteRequestCancel = () => {
    return (dispatch) => {
        dispatch({
            type: ApiRequest.DELETE_REQUEST_CANCEL
        })
    }
}
export const dataPerPage = (pageSizeChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: ApiRequest.PAGESIZE_DATA_CHANGED, payload: pageSizeChangedProps
        })
    }
}

export const openModal = () => {
    return (dispatch) => {
        dispatch({ type: ApiRequest.OPEN_MODAL })
    }
}
export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: ApiRequest.CLOSE_MODAL })
    }
}

export const sortByName = (x, y) => {
    let v1 = x.name.toUpperCase();
    let v2 = y.name.toUpperCase();
    return ((v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1));
}
export const sortByAddress = (x, y) => {
    let v1 = x.address.toUpperCase();
    let v2 = y.address.toUpperCase();
    return ((v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1));
}

export const sortByPrice = (x, y) => {
    let v1 = x.price
    let v2 = y.price
    return ((v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1));
}

export const sortBy = (x, y) => {
    return ((x === y) ? 0 : ((x > y) ? 1 : -1));
}