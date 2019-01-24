import React, { Component } from 'react';

// from React Router
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';

// layout
import Header from './components/layout/Header';

// pages
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

// Context API
import { Provider } from './context';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// App.js is the "meeting place" for all components
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/addcontact" component={AddContact} />
                <Route exact path="/editcontact:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
