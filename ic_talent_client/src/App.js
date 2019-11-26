import React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
import Customer from './components/customer';
import Store from './components/store'

const NavMenuLink = () => {
  return (<div className="ui menu">
    <div className="header item">
      REACT PROJECT
      </div>
    <Link to={"/customers"} className='item'>Customers</Link>
    <Link to={"/store"} className='item'>Store</Link>
    <Link to={"/product"} className='item'>Product</Link>
    <Link to={"/sale"} className='item'>Sale</Link>
  </div>
  )
}
const NavConfig = () => {
  return (<div className="container">
    <Switch>
      {/* <Route exact path='/' component={} /> */}
      <Route exact path='/customers' component={Customer} />
      {/* <Route path='/product' component={} /> */}
      <Route path='/store' component={Store} />
      {/* <Route path='/sale' component={} /> */}

    </Switch>
  </div>)
}
const App = () => {
  return (
    <div className="App">
      <NavMenuLink />
      <NavConfig />

    </div>
  );
}




export default App;
