import axios from 'axios'
import * as CustomerActionList from './index';
import * as ApiRequest from '../constants';

const checkEnviroment = () => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        ? ApiRequest.DEV_ROOT : ApiRequest.PRODUCTION_ROOT;
}
//get Customer
export const fetchCustomers = () => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.GET_CUSTOMERS
        });
        dispatch({
            type: CustomerActionList.PAGING_SET
        })
        axios.get(checkEnviroment() + ApiRequest.API_GET_CUSTOMERS).then((response) => {
            dispatch({
                type: CustomerActionList.GET_CUSTOMERS_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: CustomerActionList.GET_CUSTOMERS_REJECTED, payload: err.message
            })
        })
    }
}

//POST CUSTOMER
export const postCustomer = (customer) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.POST_CUSTOMER, payload: customer
        })
        axios.post(checkEnviroment() + ApiRequest.API_POST_CUSTOMER, { name: customer.name, address: customer.address },
        ).then(res => {
            dispatch({
                type: CustomerActionList.POST_CUSTOMER_SUCCESS, payload: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

//Fetch Customer By Id
export const fetchCustomer = (customerId) => {
    return (dispatch) => {
        // dispatch({
        //     type: CustomerActionList.GET_CUSTOMER_DETAIL, payload: customerId
        // })
        let req = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customerId)

        axios.get(req).then((response) => {
            dispatch({
                type: CustomerActionList.GET_CUSTOMER_DETAIL_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: CustomerActionList.GET_CUSTOMER_DETAIL_REJECTED, payload: err
            })
        })
    }
}

export const editCustomer = (customer) => {
    let updateRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customer.id)
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.UPDATE_CUSTOMER
        })
        axios.put(updateRequestForCustomer, { id: customer.id, name: customer.name, address: customer.address }).then((response) => {
            dispatch({
                type: CustomerActionList.UPDATE_CUSTOMER_SUCCESS, payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: CustomerActionList.UPDATE_CUSTOMER_ERROR, payload: error
            })
        });
    }
}

export const deleteCustomerRequest = (customerId) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.DELETE_CUSTOMER, payload: customerId
        })
    }
}

export const deleteCustomer = (customerId) => {
    let deleteRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_CUSTOMER_DETAIL.replace("{customerId}", customerId)
    return (dispatch) => {
        axios.delete(deleteRequestForCustomer).then((response) => {
            dispatch({
                type: CustomerActionList.DELETE_CUSTOMER_SUCCESS, payload: response.data
            });

        }).catch((error) => {
            dispatch({
                type: CustomerActionList.DELETE_CUSTOMER_ERROR, payload: error
            })
        });
    }
}

export const deleteRequestCancel = () => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.DELETE_CUSTOMER_CANCEL
        })
    }
}
export const pageChanged = (pageChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.PAGE_CHANGED, payload: pageChangedProps
        })
    }
}

export const dataPerPage = (pageSizeChangedProps) => {
    return (dispatch) => {
        dispatch({
            type: CustomerActionList.PAGESIZE_DATA_CHANGED, payload: pageSizeChangedProps
        })
    }
}

export const openModal = () => {
    return (dispatch) => {
        dispatch({ type: CustomerActionList.OPEN_MODAL })
    }
}
export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: CustomerActionList.CLOSE_MODAL })
    }
}

export const dataSortByName = (filterVal) => {
    var customers = filterVal.customers.sort(sortByName);
    if (filterVal.orderType === false) {
        customers = customers.sort(sortByName).reverse();
    }
    const payload = {
        orderByNameAEC: filterVal.orderType,
        customers: customers
    }
    return (dispatch) => {
        dispatch({ type: CustomerActionList.CUSTOMER_ORDERBY_NAME, payload: payload })
    }
}

export const dataSortByAddress = (filterVal) => {
    var customers = filterVal.customers.sort(sortByAddress);
    if (filterVal.orderType === false) {
        customers = customers.sort(sortByAddress).reverse();
    }
    const payload = {
        orderByAddressAEC: filterVal.orderType,
        customers: customers
    }
    return (dispatch) => {
        dispatch({ type: CustomerActionList.CUSTOMER_ORDERBY_ADDRESS, payload: payload })
    }
}

const sortByName = (x, y) => {
    let v1 = x.name.toUpperCase();
    let v2 = y.name.toUpperCase();
    return ((v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1));
}
const sortByAddress = (x, y) => {
    let v1 = x.address.toUpperCase();
    let v2 = y.address.toUpperCase();
    return ((v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1));
}
