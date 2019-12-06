import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Input, Form, Message, Container } from 'semantic-ui-react';
import { postStore, editStore } from '../../Actions/storeAction/storeActions'

class AddUpdateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.store ? props.store.id : 0,
            name: props.store ? props.store.name : '',
            address: props.store ? props.store.address : '',
            isEditMode: false,
            errors: {}
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    isEmpty = (val) => {
        return (typeof val === 'undefined' || val.length === 0 || val === "" || !val)
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
                const store = {
                    id: this.state.id,
                    name: this.state.name,
                    address: this.state.address
                }
                this.props.editStore(store)
                if (this.props.loading === false) {
                    this.clearField();
                }
            }
            else {
                const store = {
                    name: this.state.name,
                    address: this.state.address
                }
                this.props.postStore(store);
                if (this.props.loading === false) {
                    this.setState({ name: '', address: '' })
                }
            }
        }
    }

    clearField = () => {
        this.setState({
            id: this.state.id || 0,
            name: '',
            address: '',
            isEditMode: (this.state.id === 0) ? false : true,
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
                <Button content='SAVE' type='submit' color='green' icon='check' labelPosition='right' /> :
                <Button content='EDIT' color='green' icon='check' labelPosition='right' type='submit' />}
            <Button type='button' content='Clear' color='black' onClick={this.clearField} />
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
    console.log('ADDUPDATESTORE', state)
    return {
        store: state.storeReducer.store,
        storeIdforEdit: state.storeReducer.storeIdforEdit,
        openModal: state.storeReducer.openModal,
        closeModal: state.storeReducer.closeModal,
        loading: state.storeReducer.loading,
        isEditMode: state.storeReducer.isEditMode,
        isInsertMode: state.storeReducer.isInsertMode,

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        postStore: (store) => dispatch(postStore(store)),
        editStore: (store) => dispatch(editStore(store))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateStore);