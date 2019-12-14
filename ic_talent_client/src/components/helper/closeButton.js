import React, { Component } from 'react';
import { Button} from 'semantic-ui-react'
import { connect } from 'react-redux';
import{closeModal}from '../../Actions/helpers'

class CloseButton extends Component {
    render(){
        return( <Button type='button' content='CANCEL' color='black' onClick={this.props.closeModal} />)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeModal:()=>dispatch(closeModal())
    }
}
export default connect(null, mapDispatchToProps)(CloseButton)
