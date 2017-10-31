import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import ListAddress from './pages/list-address';
import AddEditAddress from './pages/add-edit-address';
import '../stylesheets/common.css';

const AppContent = () => (
  <Switch>
    <Route exact name='home' path='/' component={Home} />
    <Route exact path='/address' component={ListAddress}/>
    <Route exact path='/address/add' component={AddEditAddress} />
    <Route path={'/address/edit/:addressId'} component={AddEditAddress} />
  </Switch>
);

export default AppContent;
