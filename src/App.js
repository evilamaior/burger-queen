import React from 'react';
import './libs/reset.css';
import CreateAccount from './pages/create-account';
import Login from './pages/login';
import Kitchen from './pages/kitchen';
import Salon from './pages/salon';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/create-account" exact component={CreateAccount} />
          <Route path="/kitchen" exact component={Kitchen} />
          <Route path="/salon" exact component={Salon} />
        </div>
      </Router>
    );
  }
}

export default App;
