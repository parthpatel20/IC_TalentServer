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

export const sortBy = (x, y) => {
    return ((x === y) ? 0 : ((x > y) ? 1 : -1));
}