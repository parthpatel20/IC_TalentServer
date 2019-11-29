import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCustomer, editCustomer, fetchCustomer } from '../../Actions/customerAction/customerActions'
import { Button, Label, Input, Form, Message } from 'semantic-ui-react';

class addUpdateCustmer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.customer ? props.customer.id : 0,
            name: props.customer ? props.customer.name : '',
            address: props.customer ? props.customer.address : '',
            isEditMode: false,
            errors: {}
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }
    
    isEmpty = (val)=>{
        return(typeof val === 'undefined'|| val.length===0||val===""|| !val)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.isEmpty(this.state.name)) errors.name = <Message color='red' content="Name is required"></Message>;
        if (this.isEmpty(this.state.address)) errors.address = <Message color='red' content="Address is required"></Message>;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            if (this.props.isEditMode === true) {
                const customer = {
                    id: this.state.id,
                    name: this.state.name,
                    address: this.state.address
                }
                this.props.editCustomer(customer)
                if (this.props.loading === false) {
                    this.clearField();
                }
            }
            else {
                const customer = {
                    name: this.state.name,
                    address: this.state.address
                }
                this.props.postCustomer(customer);
                if (this.props.loading === false) {
                    this.setState({ name: '', address: '' })
                }
            }
        }
    }

    clearField = () => {
        this.setState({
            id: '',
            name: '',
            address: '',
            isEditMode: false,
            errors: {}
        })
    }
    submitForm = () => {

        return (<Form onSubmit={this.handleSubmit} loading={this.props.loading}>
            <Form.Field inline  >
                <Label>Name</Label>
                <Input placeholder='Jhon' name="name" onChange={this.handleChange} value={this.state.name || ''} />
                <span>{this.state.errors.name}</span>
            </Form.Field>
            <Form.Field inline>
                <Label  >Address</Label>
                <Input placeholder='18 block chch' name="address" onChange={this.handleChange} value={this.state.address || ''} />
                <span>{this.state.errors.address}</span>
            </Form.Field>
            {(this.props.isInsertMode) ?
                <Button content='SAVE' type='submit' color='green' icon='check' labelPosition='right' /> : <Button content='EDIT' color='green' icon='check' labelPosition='right' type='submit' />}
            <Button type='button' content='Clear' color='black' onClick={this.clearField} />
        </Form>);
    }

    render() {
        return (
            <div>

                {this.submitForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.customerReducer.customer,
        customerIdforEdit: state.customerReducer.customerIdforEdit,
        openModal: state.customerReducer.openModal,
        closeModal: state.customerReducer.closeModal,
        loading: state.customerReducer.loading,
        isEditMode: state.customerReducer.isEditMode,
        isInsertMode: state.customerReducer.isInsertMode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postCustomer: (customer) => dispatch(postCustomer(customer)),
        editCustomer: (customer) => dispatch(editCustomer(customer)),
        fetchCustomer: (customerIdforEdit) => dispatch(fetchCustomer(customerIdforEdit)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addUpdateCustmer);