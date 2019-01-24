// This will be the "Provider" component that will "wrap around" the whole application

import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

// this is where the state will live (global state)
export class Provider extends Component {
  // this is where the contact info of each person goes
  // 'id' is needed to keep track of data
  state = {
    contacts: [],

    // this is how you call an action
    dispatch: action => this.setState(state => reducer(state, action))
  };

  // Using Async/Await to make request more asynchronous
  // Fetching data to mimic a backend with data
  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      /* the entire state is being passed w/in the variable "value" */

      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Exporting Consumer
// we use the consumer w/in any components where we want to access the state
export const Consumer = Context.Consumer;
