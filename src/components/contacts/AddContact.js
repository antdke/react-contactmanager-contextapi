// This will be a search bar to add contacts
import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export class AddContact extends Component {
  // each input will a piece of the state
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  // the eventhandler to allow user to change state for each of the target items named "name"
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // SUMBIT BUTTON
  // process that happens when submit is pressed
  onSubmit = async (dispatch, e) => {
    // this prevents it from submitting to a file
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Error Checking
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return; // like 'break' in Java, stops actions once error is thrown
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    // new contact
    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    // Clears State and input fields after submission
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // Redirects user to home after submission
    this.props.history.push('/');
  };

  render() {
    // destructuring
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
