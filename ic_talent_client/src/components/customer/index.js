import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, fetchCustomer, closeModal, openModal, deleteCustomerRequest, dataSortByAddress, dataSortByName, deleteCustomer, deleteRequestCancel, pageChanged, dataPerPage } from '../../Actions/customerAction/customerActions'
import AddUpdateCustmer from './addUpdateCustmer'
import { Button, Dimmer, Loader, Icon, Confirm, Modal, Dropdown, Pagination } from 'semantic-ui-react';

class Customer extends Component {

    componentDidMount() {
        this.props.fetchCustomers();
        console.log(this.props)
    }
    deleteCustomerfromList = (customerId) => {
        this.props.deleteCustomerRequest(customerId)
    }
    handleConfirm = () => {
        this.props.deleteCustomer(this.props.deleteCustomerId);
    }
    handleCancel = () => {
        //closing delete modal
        this.props.deleteRequestCancel()
    }
    deleteConfirm = () => {
        return (<Confirm open={this.props.deleteModal} size='mini'
            header='DELETE CUSTOMER '
            onCancel={this.handleCancel}
            cancelButton='Cancel'
            confirmButton="Delete"
            onConfirm={this.handleConfirm} />);
    }
    openInsertUpdateModal = () => {
        return (<Button color='blue' onClick={() => { this.props.openModal() }}>Add</Button>);
    }
    onCloseModal = () => {
        this.props.closeModal();
    }
    addUpdateModal = () => {
        return (<Modal className="left-align" open={this.props.insertUpdateModal} size='small' closeIcon onClose={this.onCloseModal} trigger={this.openInsertUpdateModal()}>
            <Modal.Header>{(this.props.isInsertMode) ? "ADD CUSTOMER" : "EDIT CUSTOMER"}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <AddUpdateCustmer />
                </Modal.Description>
            </Modal.Content>
        </Modal>)
    }

    dropDown = () => {
        let option = [{
            key: '5',
            text: '5',
            value: '5',
        }, {
            key: '10',
            text: '10',
            value: '10',
        },
        {
            key: '15',
            text: '15',
            value: '15',
        }];
        return (<Dropdown options={option}
            defaultValue='10' onChange={this.dropdownHandleChange}>
        </Dropdown>)
    }

    dropdownHandleChange = (e, data) => {
        console.log(data.value);
        const lItem = this.props.currerntPage * parseInt(data.value);
        const fItem = lItem - parseInt(data.value);
        const pageSizeChangedProps = {
            firstItemOfThePage: fItem,
            lastItemOfthePage: lItem,
            customerPerPage: parseInt(data.value),
        }
        this.props.dataPerPage(pageSizeChangedProps);
    }
    pageChange = (event, data) => {
        const currerntPage = data.activePage;
        const lItem = currerntPage * this.props.customerPerPage;
        const fItem = lItem - this.props.customerPerPage;
        const pageChangedProps = {
            firstItemOfThePage: fItem,
            lastItemOfthePage: lItem,
            currerntPage: currerntPage
        }
        this.props.pageChanged(pageChangedProps);
    }

    pagination = () => {
        return (<Pagination
            boundaryRange={3}
            totalPages={Math.ceil(this.props.customers.length / this.props.customerPerPage)}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            activePage={this.props.currerntPage}
            onPageChange={this.pageChange}
        />
        );
    }
    orderByName = () => {
        const filterVal = {
            customers: this.props.customers,
            orderType: !this.props.orderByNameAEC
        }
        this.props.dataSortByName(filterVal)
    }

    orderByAddress = () => {
        const filterVal = {
            customers: this.props.customers,
            orderType: !this.props.orderByAddressAEC
        }
        this.props.dataSortByAddress(filterVal)
    }

    populateCustomerData = () => {
        return (
            this.props.customerSlice.map((customer, i) => {
                return (<tr key={i} className="ui table row celled">
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td><Button color="orange" onClick={() => this.props.fetchCustomer(customer.id)} >Edit</Button>
                        <Button color="red" onClick={() => this.deleteCustomerfromList(customer.id)}  >Delete</Button> </td>
                </tr>)
            })
        );
    }
    customerList = () => {
        console.log('ping', this.props)
        if (this.props.fetching) return <div>
            <Loader size="medium" active inline='centered'>Loading</Loader>
        </div>
        if (this.props.apiError) return <h1>{this.props.apiError}</h1>
        if (this.props.fetched) {
            if (this.props.customers === undefined || this.props.customers.length === 0) return <h1>There are no such data</h1>
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
                        {this.populateCustomerData()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                {this.dropDown()}
                            </td>
                            <td></td>
                            <td></td>
                            <td>{this.pagination()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div >)
        }
    }
    render() {
        return (
            <div>
                <div>{this.addUpdateModal()}</div>
                <div>{this.customerList()}</div>
                <div>{this.deleteConfirm()}</div>
            </div>)
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        customers: state.customerReducer.customers,
        fetching: state.customerReducer.fetching,
        fetched: state.customerReducer.fetched,
        isDeleteMode: state.customerReducer.isDeleteMode,
        deleteModal: state.customerReducer.deleteModal,
        deleteCustomerId: state.customerReducer.customerIdforDelete,
        insertUpdateModal: state.customerReducer.insertUpdateModal,
        customerSlice: state.customerReducer.customerSlice,
        firstItemOfThePage: state.customerReducer.firstItemOfThePage,
        lastItemOfthePage: state.customerReducer.lastItemOfthePage,
        customerPerPage: state.customerReducer.customerPerPage,
        currerntPage: state.customerReducer.currerntPage,
        orderByNameAEC: state.customerReducer.orderByNameAEC,
        orderByAddressAEC: state.customerReducer.orderByAddressAEC,
        isInsertMode: state.customerReducer.isInsertMode,
        apiError: state.customerReducer.apiError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomers: () => dispatch(fetchCustomers()),
        fetchCustomer: (customerId) => dispatch(fetchCustomer(customerId)),
        deleteCustomerRequest: (customerId) => dispatch(deleteCustomerRequest(customerId)),
        deleteCustomer: (customerId) => dispatch(deleteCustomer(customerId)),
        pageChanged: (pageChangedProps) => dispatch(pageChanged(pageChangedProps)),
        dataPerPage: (pageSizeChangedProps) => dispatch(dataPerPage(pageSizeChangedProps)),
        deleteRequestCancel: () => dispatch(deleteRequestCancel()),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal()),
        dataSortByName: (filterVal) => dispatch(dataSortByName(filterVal)),
        dataSortByAddress: (filterVal) => dispatch(dataSortByAddress(filterVal))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);