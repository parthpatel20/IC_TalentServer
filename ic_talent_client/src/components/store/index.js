import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Loader, Icon, Button, Confirm, Modal } from 'semantic-ui-react';
import { fetchStores, dataSortByName, fetchStore, dataSortByAddress, deleteStoreRequest, deleteStore } from '../../Actions/storeAction/storeActions'
import { deleteRequestCancel, openModal, closeModal } from '../../Actions/helpers'
import Pages from '../helper/pagination';
import AddUpdateStore from './addUpdateStore';
class Store extends Component {
    componentDidMount() {
        this.props.fetchStores();
    }

    orderByName = () => {
        const filterVal = {
            stores: this.props.stores,
            orderType: !this.props.orderByNameAEC,
            pageSize: this.props.pageSize
        }
        this.props.dataSortByName(filterVal)
    }

    orderByAddress = () => {
        const filterVal = {
            stores: this.props.stores,
            orderType: !this.props.orderByAddressAEC,
            pageSize: this.props.pageSize
        }
        this.props.dataSortByAddress(filterVal)
    }

    pagination = () => {
        const pageValues = {
            dataLength: this.props.stores.length
        }
        return (<Pages values={pageValues} />)
    }
    populateStoreData = () => {
        return (
            this.props.storeSlice.map((store, i) => {
                return (<tr key={i} className="ui table row celled">
                    <td>{store.id}</td>
                    <td>{store.name}</td>
                    <td>{store.address}</td>
                    <td><Button color="orange" onClick={() => this.props.fetchStore(store.id)} >Edit</Button>
                        <Button color="red" onClick={() => this.deleteStorefromList(store.id)}  >Delete</Button> </td>
                </tr>)
            })
        );
    }
    storeList = () => {
        if (this.props.fetching) return <div>
            <Loader size="medium" active inline='centered'>Loading</Loader>
        </div>
        if (this.props.apiError && this.props.stores.length === 0) return <h1>{this.props.apiError}</h1>
        if (this.props.fetched) {
            if (this.props.stores === undefined || this.props.stores.length === 0) return <h1>There are no such data</h1>
            return (<div>

                <table className="ui table">
                    <thead className="ui table header"  >
                        <tr className="ui table row">
                            <th>ID</th>
                            <th onClick={() => this.orderByName()}>NAME<Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th onClick={() => this.orderByAddress()}> ADDRESS <Icon name='sort up' size='tiny' /><Icon name='sort down' size='tiny' /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="ui table body">
                        {this.populateStoreData()}
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

    deleteStorefromList = (storeId) => {
        this.props.deleteStoreRequest(storeId)
    }

    handleConfirm = () => {
        this.props.deleteStore(this.props.deletestoreId)
    }
    handleCancel = () => {
        this.props.deleteRequestCancel()
    }
    deleteConfirm = () => {
        return (<Confirm open={this.props.deleteModal} size='mini'
            header='DELETE STORE '
            onCancel={this.handleCancel}
            cancelButton='Cancel'
            confirmButton="Delete"
            onConfirm={this.handleConfirm} />);
    }

    openInsertUpdateModal = () => {
        return (<Button color='blue' floated='left' icon='add' labelPosition='left' content='STORE' onClick={() => { this.props.openModal() }} />);
    }
    onCloseModal = () => {
        this.props.closeModal();
    }
    addUpdateModal = () => {
        return (<Modal className="left-align" open={this.props.insertUpdateModal} size='small' closeIcon onClose={this.onCloseModal} trigger={this.openInsertUpdateModal()}>
            <Modal.Header>{(this.props.isInsertMode) ? "ADD STORE" : "EDIT STORE"}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <AddUpdateStore />
                </Modal.Description>
            </Modal.Content>
        </Modal>)
    }
    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        {this.addUpdateModal()}
                    </Grid.Row>
                    <Grid.Row>
                        {this.storeList()}
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
    console.log('StoreIndex', state)
    return {
        stores: state.storeReducer.stores,
        store: state.storeReducer.store,
        fetching: state.storeReducer.fetching,
        fetched: state.storeReducer.fetched,
        storeSlice: state.storeReducer.storeSlice,
        orderByNameAEC: state.storeReducer.orderByNameAEC,
        orderByAddressAEC: state.storeReducer.orderByAddressAEC,
        apiError: state.storeReducer.apiError,
        isInsertMode: state.storeReducer.isInsertMode,
        isDeleteMode: state.storeReducer.isDeleteMode,
        deleteModal: state.storeReducer.deleteModal,
        deletestoreId: state.storeReducer.storesIdforDelete,
        insertUpdateModal: state.storeReducer.insertUpdateModal,
        firstItemOfThePage: state.pagingReducer.firstItemOfThePage,
        lastItemOfthePage: state.pagingReducer.lastItemOfthePage,
        pageSize: state.pagingReducer.pageSize,
        currentPage: state.pagingReducer.currentPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => dispatch(fetchStores()),
        fetchStore: (storeId) => dispatch(fetchStore(storeId)),
        dataSortByName: (filterVal) => dispatch(dataSortByName(filterVal)),
        dataSortByAddress: (filterVal) => dispatch(dataSortByAddress(filterVal)),
        deleteStoreRequest: (storeId) => dispatch(deleteStoreRequest(storeId)),
        deleteStore: (storeId) => dispatch(deleteStore(storeId)),
        deleteRequestCancel: () => dispatch(deleteRequestCancel()),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store)