import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, Dropdown, Message, Container } from 'semantic-ui-react';
import { editSale, postSale, productList, storeList, customerList } from './../../Actions/salesAction/salesActions';
import DatePicker from "react-datepicker";
import CloseButton from '../helper/closeButton';
class AddUpdateSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.sale ? props.sale.id : 0,
            productId: props.sale ? props.sale.productId : "",
            storeId: props.sale ? props.sale.storeId : "",
            customerId: props.sale ? props.sale.customerId : "",
            dateSold: props.sale ? props.sale.dateSold : new Date(),
            isEditMode: false,
            errors: {}
        }
    }
    componentDidMount = () => {
        this.props.productList();
        this.props.storeList();
        this.props.customerList();
    }

    clearField = () => {
        this.setState({
            id: this.props.sale ? this.props.sale.id : 0,
            productId: this.props.sale ? this.props.sale.productId : "",
            storeId: this.props.sale ? this.props.sale.storeId : "",
            customerId: this.props.sale ? this.props.sale.customerId : "",
            dateSold: this.props.sale ? new Date(this.state.dateSold) : "",
            isEditMode: false,
            errors: {}
        })
    }
    handleDrpChange = (e, data) => {
        this.setState({ [data.name]: data.value })
    }
    drpProducts = () => {
        if (this.props.products.length !== 0) {
            let options = this.props.products;
            return (<Dropdown clearable placeholder='Select Products' name='productId' options={options} selection
                onChange={this.handleDrpChange}
                value={this.state.productId}>
            </Dropdown>)
        }
    }
    drpStores = () => {
        if (this.props.stores.length !== 0) {
            let options = this.props.stores;
            return (<Dropdown clearable placeholder='Select Stores' name='storeId' options={options} selection
                onChange={this.handleDrpChange}
                value={this.state.storeId}>
            </Dropdown>)
        }
    }
    drpCustomers = () => {
        if (this.props.customers.length !== 0) {
            let options = this.props.customers;
            return (<Dropdown clearable placeholder='Select Customers'
                name='customerId' options={options} selection
                onChange={this.handleDrpChange}
                value={this.state.customerId}>
            </Dropdown>)
        }
    }
    datepicker = () => {
        return (<DatePicker
            dateFormat="dd/MM/yyyy"
            selected={(this.state.dateSold) ? new Date(this.state.dateSold) : ''}
            placeholderText='dd/mm/yyyy'
            onChange={(date) => this.setState({ dateSold: new Date(date) })}
            customInput={<Input />} />
        )
    }
    isEmpty = (val) => {
        return (typeof val === 'undefined' || val.length === 0 || val === "" || !val)
    }
    dateFormat = (val) => {
        var date = val.split("/");
        return date[1] + '/' + date[0] + '/' + date[2]
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.isEmpty(this.state.productId)) errors.productId = <Message color='red' content="Please Select Product "></Message>;
        if (this.isEmpty(this.state.storeId)) errors.storeId = <Message color='red' content="Please Select Store"></Message>;
        if (this.isEmpty(this.state.customerId)) errors.customerId = <Message color='red' content="Please Select Customer"></Message>;
        if (this.isEmpty(this.state.dateSold)) errors.dateSold = <Message color='red' content="Please Select Date"></Message>;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            if (this.props.isEditMode) {
                const sale = {
                    id: this.state.id,
                    productId: this.state.productId,
                    storeId: this.state.storeId,
                    customerId: this.state.customerId,
                    dateSold: new Date(this.state.dateSold).toLocaleDateString()
                }
                this.props.editSale(sale);
                if (this.props.loading === false) {
                    this.clearField();
                }
            }
            else {
                const sale = {
                    productId: this.state.productId,
                    storeId: this.state.storeId,
                    customerId: this.state.customerId,
                    dateSold: new Date(this.state.dateSold).toLocaleDateString()
                }
                console.log(sale);
                this.props.postSale(sale);
                if (this.props.loading === false) {
                    this.clearField();
                }
            }
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }
    submitForm = () => {
        const btnName = (this.props.isInsertMode) ? 'SAVE' : 'EDIT';
        return (<Form onSubmit={this.handleSubmit} loading={this.props.loading}>
            <Form.Field>
                <label>Date</label>
                {this.datepicker()}
                <span>{this.state.errors.dateSold}</span>
            </Form.Field>

            <Form.Field>
                <label>Product</label>
                {this.drpProducts()}
                <span>{this.state.errors.productId}</span>
            </Form.Field>

            <Form.Field >
                <label>Store</label>
                {this.drpStores()}
                <span>{this.state.errors.storeId}</span>
            </Form.Field>
            <Form.Field >
                <label>Customer</label>
                {this.drpCustomers()}
                <span>{this.state.errors.customerId}</span>
            </Form.Field>
            <Button content={btnName} type='submit' color='green' icon='check' labelPosition='right' />
            <CloseButton />
        </Form>);
    }
    render() {
        return (
            <Container>
                {this.submitForm()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sale: state.saleReducer.sale,
        saleIdforEdit: state.saleReducer.saleIdforEdit,
        openModal: state.saleReducer.openModal,
        closeModal: state.saleReducer.closeModal,
        loading: state.saleReducer.loading,
        isEditMode: state.saleReducer.isEditMode,
        isInsertMode: state.saleReducer.isInsertMode,
        stores: state.saleReducer.storeList,
        customers: state.saleReducer.customerList,
        products: state.saleReducer.productList,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        postSale: (sale) => dispatch(postSale(sale)),
        editSale: (sale) => dispatch(editSale(sale)),
        productList: () => dispatch(productList()),
        storeList: () => dispatch(storeList()),
        customerList: () => dispatch(customerList()),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUpdateSale); 