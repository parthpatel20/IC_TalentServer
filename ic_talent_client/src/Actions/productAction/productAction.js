import axios from 'axios';
import { checkEnviroment, sortBy } from '../helpers';
import * as ProductActions from './index';
import * as ApiRequest from '../constants';
export const fetchProducts = () => {
    return (dispatch) => {
        dispatch({
            type: ProductActions.GET_PRODUCTS
        });
        dispatch({
            type: ApiRequest.PAGING_SET
        })
        axios.get(checkEnviroment() + ApiRequest.API_GET_PRODUCTS).then((response) => {
            dispatch({
                type: ProductActions.GET_PRODUCTS_FULFILLED, payload: response.data
            });
        }).catch((err) => {
            dispatch({
                type: ProductActions.GET_PRODUCTS_REJECTED, payload: err.message
            })
        })
    }
}

export const postProduct = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: ProductActions.POST_PRODUCT, payload: product
        })
        axios.post(checkEnviroment() + ApiRequest.API_POST_PRODUCT, { name: product.name, price: product.price },
        ).then(res => {
            dispatch({
                type: ProductActions.POST_PRODUCT_SUCCESS, payload: res.data
            });
        }).catch(err => {
            dispatch({
                type: ProductActions.POST_PRODUCT_ERROR, payload: err.message
            });
        });
    }
}

export const dataSortByName = (filterVal) => {

    var products = (filterVal.orderType === true) ?
        filterVal.products.sort((a, b) => sortBy(a.name.toUpperCase(), b.name.toUpperCase()))
        : filterVal.products.sort((a, b) => sortBy(a.name.toUpperCase(), b.name.toUpperCase())).reverse();

    const payload = {
        orderByAddressAEC: filterVal.orderType,
        customers: products,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: ProductActions.PRODUCT_ORDERBY_NAME, payload: payload })
    }
}

export const dataSortByPrice = (filterVal) => {
    var products = (filterVal.orderType === true) ?
        filterVal.products.sort((a, b) => sortBy(a.price, b.price))
        : filterVal.products.sort((a, b) => sortBy(a.price, b.price)).reverse();
 
    const payload = {
        orderByPriceAEC: filterVal.orderType,
        products: products,
        pageSize: filterVal.pageSize
    }
    return (dispatch) => {
        dispatch({ type: ProductActions.PRODUCT_ORDERBY_PRICE, payload: payload })
    }


}

export const deleteProductRequest = (productId) => {
    return (dispatch) => {
        dispatch({
            type: ProductActions.DELETE_PRODUCT, payload: productId
        })
    }
}

export const deleteProduct = (productId) => {
    
    let deleteRequestForProduct = checkEnviroment() + ApiRequest.API_GET_PRODUCT_DETAIL.replace("{productId}", productId)
    return (dispatch) => {
        axios.delete(deleteRequestForProduct).then((response) => {
            dispatch({
                type: ProductActions.DELETE_PRODUCT_SUCCESS, payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type: ProductActions.DELETE_PRODUCT_ERROR, payload: error
            })
        });
    }
}

export const fetchProduct = (productId) => {
    return (dispatch) => {
        let req = checkEnviroment() + ApiRequest.API_GET_PRODUCT_DETAIL.replace("{productId}", productId)

        axios.get(req).then((response) => {
            dispatch({
                type: ProductActions.GET_PRODUCT_DETAIL_FULFILLED, payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: ProductActions.GET_PRODUCT_DETAIL_REJECTED, payload: err
            })
        })
    }
}

export const editProduct = (product) => {
    let updateRequestForCustomer = checkEnviroment() + ApiRequest.API_GET_PRODUCT_DETAIL.replace("{productId}", product.id)
    return (dispatch) => {
        dispatch({
            type: ProductActions.UPDATE_PRODUCT
        });

        axios.put(updateRequestForCustomer, { id: product.id, name: product.name, price: product.price }).then((response) => {
            dispatch({
                type: ProductActions.UPDATE_PRODUCT_SUCCESS, payload: response.data
            })
        }).catch((error) => {
            dispatch({
                type: ProductActions.UPDATE_PRODUCT_ERROR, payload: error
            })
        });
    }
}