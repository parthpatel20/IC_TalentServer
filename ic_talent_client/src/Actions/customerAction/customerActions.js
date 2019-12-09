import axios from 'axios'
import * as CustomerActions from './index';
import * as ApiRequest from '../constants';
import { checkEnviroment, sortBy } from '../helpers';

export const fetchCustomers = () => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.GET_CUSTOMERS
        });
        dispatch({
            type: CustomerActions.PAGING_SET
        })
        axios.get(checkEnviroment() + ApiRequest.API_GET_CUSTOMERS).then((response) => {
            dispatch({
                type: CustomerActions.GET_CUSTOMERS_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: CustomerActions.GET_CUSTOMERS_REJECTED, payload: err.message
            })
        })
    }
}

export const postCustomer = (customer) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.POST_CUSTOMER, payload: customer
        })
        axios.post(checkEnviroment() + ApiRequest.API_POST_CUSTOMER, { name: customer.name, address: customer.address },
        ).then(res => {
            dispatch({
                type: CustomerActions.POST_CUSTOMER_SUCCESS, payload: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export const fetchCustomer = (customerId) => {
    return (dispatch) => {
        let req = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customerId)
        axios.get(req).then((response) => {
            dispatch({
                type: CustomerActions.GET_CUSTOMER_DETAIL_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: CustomerActions.GET_CUSTOMER_DETAIL_REJECTED, payload: err
            })
        })
    }
}

export const editCustomer = (customer) => {
    let updateRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customer.id)
    return (dispatch) => {
        dispatch({
            type: CustomerActions.UPDATE_CUSTOMER
        })
        axios.put(updateRequestForCustomer, { id: customer.id, name: customer.name, address: customer.address }).then((response) => {
            dispatch({
                type: CustomerActions.UPDATE_CUSTOMER_SUCCESS, payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: CustomerActions.UPDATE_CUSTOMER_ERROR, payload: error
            })
        });
    }
}

export const deleteCustomerRequest = (customerId) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.DELETE_CUSTOMER, payload: customerId
        })
    }
}

export const deleteCustomer = (customerId) => {
    let deleteRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customerId)
    return (dispatch) => {
        axios.delete(deleteRequestForCustomer).then((response) => {
            dispatch({
                type: CustomerActions.DELETE_CUSTOMER_SUCCESS, payload: response.data
            });

        }).catch((error) => {
            dispatch({
                type: CustomerActions.DELETE_CUSTOMER_ERROR, payload: error
            })
        });
    }
}

export const deleteRequestCancel = () => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.DELETE_CUSTOMER_CANCEL
        })
    }
}
export const pageChanged = (pageChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.PAGE_CHANGED, payload: pageChangedProps
        })
    }
}

export const dataPerPage = (pageSizeChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActions.PAGESIZE_DATA_CHANGED, payload: pageSizeChangedProps
        })
    }
}

export const openModal = () => {
    return (dispatch) => {
        dispatch({ type: CustomerActions.OPEN_MODAL })
    }
}
export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: CustomerActions.CLOSE_MODAL })
    }
}

export const dataSortByName = (filterVal) => {
    var customers = (filterVal.orderType === true) ?
        filterVal.customers.sort((a, b) => sortBy(a.name.toUpperCase(), b.name.toUpperCase()))
        : filterVal.products.sort((a, b) => sortBy(a.name.toUpperCase(), b.name.toUpperCase())).reverse();

    const payload = {
        orderByAddressAEC: filterVal.orderType,
        customers: customers,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: CustomerActions.CUSTOMER_ORDERBY_NAME, payload: payload })
    }
}

export const dataSortByAddress = (filterVal) => {
    var customers = (filterVal.orderType === true) ?
        filterVal.customers.sort((a, b) => sortBy(a.address.toUpperCase(), b.address.toUpperCase()))
        : filterVal.sales.sort((a, b) => sortBy(a.address.toUpperCase(), b.address.toUpperCase())).reverse();

    const payload = {
        orderByAddressAEC: filterVal.orderType,
        customers: customers,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: CustomerActions.CUSTOMER_ORDERBY_ADDRESS, payload: payload })
    }
}
