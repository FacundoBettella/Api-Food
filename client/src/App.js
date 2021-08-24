import './App.css';
import React from 'react';
import LandingPage from './modules/LandingPage';
import Search from './modules/Search';
import Recipe from './modules/Recipe';
import Create from './modules/Create';

import { Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Search} />
      <Route path='/recipe/:id' component={Recipe} />
      <Route path='/create' component={Create} />
    </React.Fragment>  
  );
}
export default App;
