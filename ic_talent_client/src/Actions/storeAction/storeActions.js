import axios from 'axios';
import { checkEnviroment, sortByName, sortByAddress } from '../helpers';
import * as StoreActions from './index';
import * as ApiRequest from '../constants';

//get Stores
export const fetchStores = () => {
    return (dispatch) => {
        dispatch({
            type: StoreActions.GET_STORES
        });
        dispatch({
            type: ApiRequest.PAGING_SET
        })
        axios.get(checkEnviroment() + ApiRequest.API_GET_STORES).then((response) => {
            dispatch({
                type: StoreActions.GET_STORES_FULFILLED, payload: response.data
            });
        }).catch((err) => {
            dispatch({
                type: StoreActions.GET_STORES_REJECTED, payload: err.message
            })
        })
    }
}

//post Customer
export const postStore = (store) => {
    return (dispatch) => {
        dispatch({
            type: StoreActions.POST_STORE, payload: store
        })
        axios.post(checkEnviroment() + ApiRequest.API_POST_STORE, { name: store.name, address: store.address },
        ).then(res => {
            dispatch({
                type: StoreActions.POST_STORE_SUCCESS, payload: res.data
            });
        }).catch(err => {
            dispatch({
                type: StoreActions.POST_STORE_ERROR, payload: err.message
            });
        });
    }
}


export const dataSortByName = (filterVal) => {
    var stores = filterVal.stores.sort(sortByName);
    if (filterVal.orderType === false) {
        stores = stores.sort(sortByName).reverse();
    }
    const payload = {
        orderByNameAEC: filterVal.orderType,
        stores: stores,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: StoreActions.STORE_ORDERBY_NAME, payload: payload })
    }
}

export const dataSortByAddress = (filterVal) => {
    var stores = filterVal.stores.sort(sortByAddress);
    if (filterVal.orderType === false) {
        stores = stores.sort(sortByAddress).reverse();
    }
    const payload = {
        orderByAddressAEC: filterVal.orderType,
        stores: stores,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: StoreActions.STORE_ORDERBY_ADDRESS, payload: payload })
    }
}
export const deleteStoreRequest = (storeId) => {
    return (dispatch) => {
        dispatch({
            type: StoreActions.DELETE_STORE, payload: storeId
        })
    }
}

export const deleteStore = (storeId) => {

    let deleteRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_STORE_DETAIL.replace("{storeId}", storeId)
    return (dispatch) => {
        axios.delete(deleteRequestForCustomer).then((response) => {
            dispatch({
                type: StoreActions.DELETE_STORE_SUCCESS, payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type: StoreActions.DELETE_STORE_ERROR, payload: error
            })
        });
    }
}

export const fetchStore = (storeId) => {
    return (dispatch) => {
        // dispatch({
        //     type: CustomerActionList.GET_CUSTOMER_DETAIL, payload: storeId
        // })
        let req = checkEnviroment() + ApiRequest.API_GET_STORE_DETAIL.replace("{storeId}", storeId)

        axios.get(req).then((response) => {
            dispatch({
                type: StoreActions.GET_STORE_DETAIL_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: StoreActions.GET_STORE_DETAIL_REJECTED, payload: err
            })
        })
    }
}

export const editStore = (store) => {
    let updateRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_STORE_DETAIL.replace("{storeId}", store.id)
    return (dispatch) => {
        dispatch({
            type: StoreActions.UPDATE_STORE
        });

        axios.put(updateRequestForCustomer, { id: store.id, name: store.name, address: store.address }).then((response) => {
            dispatch({
                type: StoreActions.UPDATE_STORE_SUCCESS, payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: StoreActions.UPDATE_STORE_ERROR, payload: error
            })
        });
    }
}
