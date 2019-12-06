import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Loader, Icon, Button, Confirm, Modal } from 'semantic-ui-react';
import { fetchSales, dataSortByCustomer, dataSortByProduct, dataSortByDate, dataSortByStore, deleteSaleRequest, deleteSale } from '../../Actions/salesAction/salesActions';
import Pages from '../helper/pagination';
import { deleteRequestCancel, openModal, closeModal } from '../../Actions/helpers';
import AddUpdateSale from './addUpdateSale'

class Sale extends Component {
    componentDidMount() {
        this.props.fetchSales();
    }
    handleConfirm = () => {
        this.props.deleteSale(this.props.deleteSaleId)
    }
    handleCancel = () => {
        this.props.deleteRequestCancel()
    }
    deleteSalefromList = (productId) => {
        this.props.deleteSaleRequest(productId)
    }
    deleteConfirm = () => {
        return (<Confirm open={this.props.deleteModal} size='mini'
            header='DELETE SALE'
            onCancel={this.handleCancel}
            cancelButton='Cancel'
            confirmButton="Delete"
            onConfirm={this.handleConfirm} />);
    }

    filterProps = (orderType) => {
        return {
            sales: this.props.sales,
            orderType: orderType,
            pageSize: this.props.pageSize
        }
    }
    orderByCustomer = () => {
        this.props.dataSortByCustomer(this.filterProps(!this.props.orderByCustomerAEC))
    }
    orderByProduct = () => {
        this.props.dataSortByProduct(this.filterProps(!this.props.orderByProductAEC))
    }
    orderByStore = () => {
        this.props.dataSortByStore(this.filterProps(!this.props.orderByStoreAEC))
    }
    orderByDate = () => {
        this.props.dataSortByDate(this.filterProps(!this.props.orderByDateAEC))
    }
    pagination = () => {
        const pageValues = {
            dataLength: this.props.sales.length
        }
        return (<Pages values={pageValues} />)
    }

    openInsertUpdateModal = () => {
        return (<Button color='blue' floated='left' icon='add' labelPosition='left' content='SALE' onClick={() => { this.props.openModal() }} />);
    }
    onCloseModal = () => {
        this.props.closeModal();
    }
    addUpdateModal = () => {

        return (<Modal className="left-align" open={this.props.insertUpdateModal} size='small' closeIcon onClose={this.onCloseModal} trigger={this.openInsertUpdateModal()}>
            <Modal.Header>{(this.props.isInsertMode) ? "ADD SALE" : "EDIT SALE"}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <AddUpdateSale />
                </Modal.Description>
            </Modal.Content>
        </Modal>)
    }
    populateSaleData = () => {
        return (
            this.props.saleSlice.map((sale, i) => {
                return (<tr key={i} className="ui table row celled">
                    <td>{sale.id}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.storeName}</td>
                    <td>{sale.dateSold}</td>
                    <td><Button color="orange" onClick={() => this.props.fetchSale(sale.id)} >Edit</Button>
                        <Button color="red" onClick={() => this.deleteSalefromList(sale.id)}  >Delete</Button> </td>
                </tr>)
            })
        );
    }
    saleList = () => {
        if (this.props.fetching) return <div>
            <Loader size="medium" active inline='centered'>Loading</Loader>
        </div>
        if (this.props.apiError && this.props.sales.length === 0) return <h1>{this.props.apiError}</h1>
        if (this.props.fetched) {
            if (this.props.sales === undefined || this.props.sales.length === 0) return <h1>There are no such data</h1>
            return (<div className='ui container'>
                <table className="ui table">
                    <thead className="ui table header"  >
                        <tr className="ui table row">
                            <th>ID</th>
                            <th onClick={() => this.orderByProduct()}>PRODUCT<Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th onClick={() => this.orderByCustomer()}> CUSTOMER <Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th onClick={() => this.orderByStore()}> STORE <Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th onClick={() => this.orderByDate()}> DATE SOLD <Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="ui table body">
                        {this.populateSaleData()}
                    </tbody>
                    <tfoot className="ui table footer">
                        <tr>
                            <td colSpan='6'> {this.pagination()}</td>
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
                        {this.saleList()}
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
        sales: state.saleReducer.sales,
        sale: state.saleReducer.sale,
        fetching: state.saleReducer.fetching,
        fetched: state.saleReducer.fetched,
        saleSlice: state.saleReducer.salesSlice,
        apiError: state.productReducer.apiError,
        orderByCustomerAEC: state.saleReducer.orderByCustomerAEC,
        orderByProductAEC: state.saleReducer.orderByProductAEC,
        orderByStoreAEC: state.saleReducer.orderByStoreAEC,
        orderByDateAEC: state.saleReducer.orderByDateAEC,
        pageSize: state.pagingReducer.pageSize,
        currentPage: state.pagingReducer.currentPage,
        isInsertMode: state.saleReducer.isInsertMode,
        insertUpdateModal: state.saleReducer.insertUpdateModal,
        isDeleteMode: state.saleReducer.isDeleteMode,
        deleteModal: state.saleReducer.deleteModal,
        deleteSaleId: state.saleReducer.saleIdforDelete
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSales: () => dispatch(fetchSales()),
        dataSortByCustomer: (filterVal) => dispatch(dataSortByCustomer(filterVal)),
        dataSortByProduct: (filterVal) => dispatch(dataSortByProduct(filterVal)),
        dataSortByStore: (filterVal) => dispatch(dataSortByStore(filterVal)),
        dataSortByDate: (filterVal) => dispatch(dataSortByDate(filterVal)),
        deleteSaleRequest: (saleId) => dispatch(deleteSaleRequest(saleId)),
        deleteSale: (saleId) => dispatch(deleteSale(saleId)),
        deleteRequestCancel: () => dispatch(deleteRequestCancel()),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sale);