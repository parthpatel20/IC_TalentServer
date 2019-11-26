import React, { Component } from 'react';
import { Pagination, Dropdown } from 'semantic-ui-react'
import { pageChanged, dataPerPage } from '../../Actions/helpers'
import { connect } from 'react-redux';

class Pages extends Component {

    pageSizeHandleChange = (e, data) => {
        this.props.dataPerPage(this.pagerCalc(1, parseInt(data.value)));
    }
    pageSize = () => {
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
            defaultValue='10' onChange={this.pageSizeHandleChange}>
        </Dropdown>)
    }
    pagerCalc = (currentPage, pageSize) => {
        const lItem = currentPage * pageSize;
        const fItem = lItem - pageSize;
        const pagerCalcProps = {
            firstItemOfThePage: fItem,
            lastItemOfthePage: lItem,
            pageSize: pageSize,
            currentPage: currentPage
        }
        return pagerCalcProps
    }
    pageChange = (event, data) => {
        this.props.pageChanged(this.pagerCalc(data.activePage, this.props.pageSize));
    }
    render() {
        const totalPages = Math.ceil(this.props.values.dataLength / this.props.pageSize)
        return (<div className='ui equal width  grid'>
            <div className='ui column' style={{ textAlign: 'left' }}>{this.pageSize()}</div>
            <div className='ui column' style={{ textAlign: 'right' }}><Pagination
                boundaryRange={3}
                totalPages={totalPages}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                activePage={this.props.currentPage}
                onPageChange={this.pageChange}
            /></div>
        </div>
        )
    }

}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        pageSize: state.pagingReducer.pageSize,
        currentPage: state.pagingReducer.currentPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        pageChanged: (pageChangedProps) => dispatch(pageChanged(pageChangedProps)),
        dataPerPage: (pageSizeChangedProps) => dispatch(dataPerPage(pageSizeChangedProps))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pages)