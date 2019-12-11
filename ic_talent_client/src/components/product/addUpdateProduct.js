import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Input, Form, Message, Container } from 'semantic-ui-react';
import { postProduct, editProduct } from '../../Actions/productAction/productAction'
class AddUpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.product ? props.product.id : 0,
            name: props.product ? props.product.name : '',
            price: props.product ? props.product.price : '',
            isEditMode: false,
            errors: {}
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        let errors = {};
        if (typeof this.state.name !== 'undefined') errors.name='';
        if (typeof this.state.price !== 'undefined') errors.price='';
        this.setState({ errors });
    }
    isEmpty = (val)=>{
        return(typeof val === 'undefined'|| val.length===0||val===""|| !val)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        
        if (this.isEmpty(this.state.name)) errors.name = <Message color='red' content="Name is required"></Message>;
        if (this.isEmpty(this.state.price)) errors.price = <Message color='red' content="Price is required"></Message>;
        if(parseFloat( this.state.price) <= 0) errors.price = <Message color='red' content="Price should be in positive number"></Message>;
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            if (this.props.isEditMode === true) {
                const product = {
                    id: this.state.id,
                    name: this.state.name,
                    price: parseFloat(this.state.price)
                }
                this.props.editProduct(product)
                if (this.props.loading === false) {
                    this.clearField();
                }
            }
            else {
                const product = {
                    name: this.state.name,
                    price: parseFloat(this.state.price)
                }
                this.props.postProduct(product);
                if (this.props.loading === false) {
                    this.setState({ name: '', price: '' })
                }
            }
        }
    }

    clearField = () => {
        this.setState({
            id: this.state.id || 0,
            name: '',
            price: '',
            isEditMode: (this.state.id === 0) ? false : true,
            errors: {}
        })
    }

    submitForm = () => {
        const btnName = (this.props.isInsertMode) ? 'SAVE' : 'EDIT';
        return (<Form onSubmit={this.handleSubmit} loading={this.props.loading}>
            <Form.Field inline  >
                <Label>Name</Label>
                <Input placeholder='Jhon' name="name" onChange={this.handleChange} value={this.state.name || ''} />
                <span>{this.state.errors.name}</span>
            </Form.Field>
            <Form.Field inline>
                <Label>Price</Label>
                <Input type="number" 
                name="price" 
                step = "0.1"
                min = "0"
                placeholder = "0.00"
                onChange={this.handleChange} value={this.state.price || ''} 
                pattern="^\d+(?:\.\d{1,2})?$"  />
                <span>{this.state.errors.price}</span>
            </Form.Field>
            <Button content={btnName} type='submit' color='green' icon='check' labelPosition='right' />
            <Button type='button' content='CLEAR' color='black' onClick={this.clearField} />
        </Form>);
    }

    render() {
        return (
            <Container>
                {this.submitForm()}
            </Container>);
    }
}

const mapStateToProps = (state) => {
    return {

        product: state.productReducer.product,
        productIdforEdit: state.productReducer.productIdforEdit,
        openModal: state.productReducer.openModal,
        closeModal: state.productReducer.closeModal,
        loading: state.productReducer.loading,
        isEditMode: state.productReducer.isEditMode,
        isInsertMode: state.productReducer.isInsertMode,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        postProduct: (product) => dispatch(postProduct(product)),
        editProduct: (product) => dispatch(editProduct(product))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateProduct);