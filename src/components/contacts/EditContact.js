// This will be a search bar to add contacts
import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export class EditContact extends Component {
  // each input will a piece of the state
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

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

    const updContact = {
      name, // ES6 syntax for "name:name"
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
