import axios from 'axios';
import { checkEnviroment, sortByName, sortBy } from '../helpers';
import * as SalesActions from './index';
import * as ApiRequest from '../constants';

export const fetchSales = () => {
    return (dispatch) => {
        dispatch({
            type: SalesActions.GET_SALES
        });
        dispatch({
            type: ApiRequest.PAGING_SET
        })
        axios.get(checkEnviroment() + ApiRequest.API_GET_SALES).then((response) => {
            dispatch({
                type: SalesActions.GET_SALES_FULFILLED, payload: response.data
            });
        }).catch((err) => {
            dispatch({
                type: SalesActions.GET_SALES_REJECTED, payload: err.message
            })
        })
    }
}

//post Customer
export const postSale = (sale) => {
    return (dispatch) => {
        dispatch({
            type: SalesActions.POST_SALE, payload: sale
        })
        axios.post(checkEnviroment() + ApiRequest.API_POST_SALE, { productId: sale.productId, customerId: sale.customerId, storeId: sale.storeId, dateSold: sale.dateSold },
        ).then(res => {
            dispatch({
                type: SalesActions.POST_SALE_SUCCESS, payload: res.data
            });
        }).catch(err => {
            dispatch({
                type: SalesActions.POST_SALE_ERROR, payload: err.message
            });
        });
    }
}

export const dataSortByCustomer = (filterVal) => {

    var sales = (filterVal.orderType === true) ?
        filterVal.sales.sort((a, b) => sortBy(a.customerName.toUpperCase(), b.customerName.toUpperCase()))
        : filterVal.sales.sort((a, b) => sortBy(a.customerName.toUpperCase(), b.customerName.toUpperCase())).reverse();

    const payload = {
        orderByCustomerAEC: filterVal.orderType,
        sales: sales,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: SalesActions.SALE_ORDERBY_CUSTOMER, payload: payload })
    }
}
export const dataSortByProduct = (filterVal) => {
    var sales = (filterVal.orderType === true) ?
        filterVal.sales.sort((a, b) => sortBy(a.productName.toUpperCase(), b.productName.toUpperCase()))
        : filterVal.sales.sort((a, b) => sortBy(a.productName.toUpperCase(), b.productName.toUpperCase())).reverse();

    const payload = {
        orderByProductAEC: filterVal.orderType,
        sales: sales,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: SalesActions.SALE_ORDERBY_PRODUCT, payload: payload })
    }
}
export const dataSortByStore = (filterVal) => {

    var sales = (filterVal.orderType === true) ?
        filterVal.sales.sort((a, b) => sortBy(a.storeName.toUpperCase(), b.storeName.toUpperCase()))
        : filterVal.sales.sort((a, b) => sortBy(a.storeName.toUpperCase(), b.storeName.toUpperCase())).reverse();
    const payload = {
        orderByStoreAEC: filterVal.orderType,
        sales: sales,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: SalesActions.SALE_ORDERBY_STORE, payload: payload })
    }
}
export const dataSortByDate = (filterVal) => {

    var sales = (filterVal.orderType === true) ?
        filterVal.sales.sort((a, b) => sortBy(new Date(a.dateSold), new Date(b.dateSold)))
        : filterVal.sales.sort((a, b) => sortBy(new Date(a.dateSold), new Date(b.dateSold))).reverse();
    const payload = {
        orderByDateAEC: filterVal.orderType,
        sales: sales,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: SalesActions.SALE_ORDERBY_DATE, payload: payload })
    }
}

export const deleteSaleRequest = (saleId) => {
    return (dispatch) => {
        dispatch({
            type: SalesActions.DELETE_SALE, payload: saleId
        })
    }
}

export const deleteSale = (saleId) => {
    debugger;
    let deleteRequestForSale = checkEnviroment() + ApiRequest.API_GET_SALE_DETAIL.replace("{saleId}", saleId)
    return (dispatch) => {
        axios.delete(deleteRequestForSale).then((response) => {
            dispatch({
                type: SalesActions.DELETE_SALE_SUCCESS, payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type: SalesActions.DELETE_SALE_ERROR, payload: error
            })
        });
    }
}


export const fetchSale = (saleId) => {
    return (dispatch) => {
        let req = checkEnviroment() + ApiRequest.API_GET_SALE_DETAIL.replace("{saleId}", saleId)
        axios.get(req).then((response) => {
            dispatch({
                type: SalesActions.GET_SALE_DETAIL_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: SalesActions.GET_SALE_DETAIL_REJECTED, payload: err
            })
        })
    }
}

export const editSale = (sale) => {
    let updateRequestForSale = checkEnviroment() + ApiRequest.API_GET_SALE_DETAIL.replace("{saleId}", sale.id)
    return (dispatch) => {
        dispatch({
            type: SalesActions.UPDATE_SALE
        });

        axios.put(updateRequestForSale, { id: sale.id, productId: sale.productId, customerId: sale.customerId, storeId: sale.storeId, dateSold: sale.dateSold }).then((response) => {
            dispatch({
                type: SalesActions.UPDATE_SALE_SUCCESS, payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: SalesActions.UPDATE_SALE_ERROR, payload: error
            })
        });
    }
}

export const productList = () => {
    return (dispatch) => {
        axios.get(checkEnviroment() + ApiRequest.API_GET_PRODUCTS).then((response) => {
            let products = response.data;
            let productList = [];
            if (products !== undefined || products.length !== 0) {
                products.map((product, i) => {
                    productList.push({
                        key: product.id,
                        text: product.name,
                        value: product.id,
                    });
                })
            }
            dispatch({
                type: SalesActions.PRODUCT_LIST, payload: productList
            })
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

export const storeList = () => {
    return (dispatch) => {
        axios.get(checkEnviroment() + ApiRequest.API_GET_STORES).then((response) => {
            let stores = response.data;
            let storeList = [];
            if (stores !== undefined || stores.length !== 0) {
                stores.map((store, i) => {
                    storeList.push({
                        key: store.id,
                        text: store.name,
                        value: store.id,
                    });
                })
            }
            dispatch({
                type: SalesActions.STORE_LIST, payload: storeList
            })
        }).catch((err) => {
            console.log(err.message)
        })
    }
}


export const customerList = () => {
    return (dispatch) => {
        axios.get(checkEnviroment() + ApiRequest.API_GET_CUSTOMERS).then((response) => {
            let customers = response.data;
            let customerList = [];
            if (customers !== undefined || customers.length !== 0) {
                customers.map((customer, i) => {
                    customerList.push({
                        key: customer.id,
                        text: customer.name,
                        value: customer.id,
                    });
                })
            }
            dispatch({
                type: SalesActions.CUSTOMER_LIST, payload: customerList
            })
        }).catch((err) => {
            console.log(err.message)
        })
    }
}
