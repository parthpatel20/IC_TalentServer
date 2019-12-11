import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Loader, Icon, Button, Confirm, Modal } from 'semantic-ui-react';
import { fetchProducts, fetchProduct, dataSortByPrice, dataSortByName, deleteProduct, deleteProductRequest } from '../../Actions/productAction/productAction';
import { deleteRequestCancel, openModal, closeModal } from '../../Actions/helpers'
import Pages from '../helper/pagination';
import AddUpdateProduct from './addUpdateProduct';
class Product extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    handleConfirm = () => {
        this.props.deleteProduct(this.props.deleteProductId)
    }
    handleCancel = () => {
        this.props.deleteRequestCancel()
    }
    deleteProductfromList = (productId) => {
        this.props.deleteProductRequest(productId)
    }
    deleteConfirm = () => {
        return (<Confirm open={this.props.deleteModal} size='mini'
            header='DELETE PRODUCT'
            onCancel={this.handleCancel}
            cancelButton='Cancel'
            confirmButton="Delete"
            onConfirm={this.handleConfirm} />);
    }

    pagination = () => {
        const pageValues = {
            dataLength: this.props.products.length
        }
        return (<Pages values={pageValues} />)
    }
    orderByName = () => {
        const filterVal = {
            products: this.props.products,
            orderType: !this.props.orderByNameAEC,
            pageSize: this.props.pageSize
        }
        this.props.dataSortByName(filterVal)
    }

    orderByPrice = () => {
        const filterVal = {
            products: this.props.products,
            orderType: !this.props.orderByPriceAEC,
            pageSize: this.props.pageSize
        }

        this.props.dataSortByPrice(filterVal)
    }

    openInsertUpdateModal = () => {
        return (<Button color='blue' floated='left' icon='add' labelPosition='left' content='PRODUCT' onClick={() => { this.props.openModal() }} />);
    }
    onCloseModal = () => {
        this.props.closeModal();
    }
    addUpdateModal = () => {

        return (<Modal className="left-align" open={this.props.insertUpdateModal} size='small' closeIcon onClose={this.onCloseModal} trigger={this.openInsertUpdateModal()}>
            <Modal.Header>{(this.props.isInsertMode) ? "ADD PRODUCT" : "EDIT PRODUCT"}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <AddUpdateProduct />
                </Modal.Description>
            </Modal.Content>
        </Modal>)
    }
    populateProductData = () => {
        return (
            this.props.productSlice.map((product, i) => {
                return (<tr key={i} className="ui table row celled">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td><Button color="orange" onClick={() => this.props.fetchProduct(product.id)} >Edit</Button>
                        <Button color="red" onClick={() => this.deleteProductfromList(product.id)}  >Delete</Button> </td>
                </tr>)
            })
        );
    }
    productList = () => {
        if (this.props.fetching) return <div>
            <Loader size="medium" active inline='centered'>Loading</Loader>
        </div>
        if (this.props.apiError && this.props.products.length === 0) return <h1>{this.props.apiError}</h1>
        if (this.props.fetched) {
            if (this.props.products === undefined || this.props.product.length === 0) return <h1>There are no such data</h1>
            return (<div className='ui container'>
                <table className="ui table">
                    <thead className="ui table header"  >
                        <tr className="ui table row">
                            <th>ID</th>
                            <th onClick={() => this.orderByName()}>NAME<Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th onClick={() => this.orderByPrice()}> PRICE <Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="ui table body">
                        {this.populateProductData()}
                    </tbody>
                    <tfoot className="ui table footer">
                        <tr>
                            <td colSpan='4'> {this.pagination()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div >)
        }
    }
    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        {this.addUpdateModal()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.productList()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.deleteConfirm()}
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        product: state.productReducer.product,
        fetching: state.productReducer.fetching,
        fetched: state.productReducer.fetched,
        productSlice: state.productReducer.productSlice,
        orderByNameAEC: state.productReducer.orderByNameAEC,
        orderByPriceAEC: state.productReducer.orderByPriceAEC,
        apiError: state.productReducer.apiError,
        pageSize: state.pagingReducer.pageSize,
        currentPage: state.pagingReducer.currentPage,
        isInsertMode: state.productReducer.isInsertMode,
        insertUpdateModal: state.productReducer.insertUpdateModal,
        isDeleteMode: state.productReducer.isDeleteMode,
        deleteModal: state.productReducer.deleteModal,
        deleteProductId: state.productReducer.productIdforDelete
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchProduct: (productId) => dispatch(fetchProduct(productId)),
        dataSortByName: (filterVal) => dispatch(dataSortByName(filterVal)),
        dataSortByPrice: (filterVal) => dispatch(dataSortByPrice(filterVal)),
        deleteProductRequest: (productId) => dispatch(deleteProductRequest(productId)),
        deleteProduct: (productId) => dispatch(deleteProduct(productId)),
        deleteRequestCancel: () => dispatch(deleteRequestCancel()),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);