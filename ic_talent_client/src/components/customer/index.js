import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, fetchCustomer, closeModal, openModal, deleteCustomerRequest, dataSortByAddress, dataSortByName, deleteCustomer, deleteRequestCancel, pageChanged, dataPerPage } from '../../Actions/customerAction/customerActions'
import AddUpdateCustmer from './addUpdateCustmer'
import { Button, Loader, Icon, Confirm, Modal, Dropdown, Pagination, Container } from 'semantic-ui-react';

class Customer extends Component {

    componentDidMount() {
        this.props.fetchCustomers();
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
        return (<Button color='blue' floated='left' icon='add' labelPosition='left' content='CUSTOMER' onClick={() => { this.props.openModal() }} />);
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

    pageSizedropDown = () => {
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

        const lItem = this.props.currentPage * parseInt(data.value);
        const fItem = lItem - parseInt(data.value);
        const pageSizeChangedProps = {
            firstItemOfThePage: fItem,
            lastItemOfthePage: lItem,
            customerPerPage: parseInt(data.value),
        }
        this.props.dataPerPage(pageSizeChangedProps);
    }

    pageChange = (event, data) => {

        const currentPage = data.activePage;
        const lItem = currentPage * this.props.customerPerPage;
        const fItem = lItem - this.props.customerPerPage;
        const pageChangedProps = {
            firstItemOfThePage: fItem,
            lastItemOfthePage: lItem,
            currentPage: currentPage
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
            activePage={this.props.currentPage}
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

        if (this.props.fetching) return <div>
            <Loader size="medium" active inline='centered'>Loading</Loader>
        </div>
        if (this.props.apiError && this.props.customers.length === 0) return <h1>{this.props.apiError}</h1>
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
                                {this.pageSizedropDown()}
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
            <Container>
                <div className=' ui grid'>
                    <div className='row'>{this.addUpdateModal()}</div>
                    <div className='row'>{this.customerList()}</div>
                    <div className='row'>{this.deleteConfirm()}</div>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('CSR', state)
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
        currentPage: state.customerReducer.currentPage,
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