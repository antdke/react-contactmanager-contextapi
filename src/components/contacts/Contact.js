import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';

export class Contact extends Component {
  // holds the state of the "show toggle"
  state = {
    showContactInfo: false
  };

  // the "dispatch", "id", and "this" have been binded into this function
  onDeleteClick = async (id, dispatch) => {
    // this try/catch is a workaround bcuz we can't make a request to delete an obj that doesn't exist in the jsonplaceholder
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
      // an error message is still sent out but we can still execute the delete
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    // destructures the props that were passed to this component
    // In this case, the "contact" obj is being pass to this component and in this line, I'm pulling out its props
    const { id, name, email, phone } = this.props.contact;

    // destructuring showContactInfo from state
    const { showContactInfo } = this.state;

    // displays the content with the destructured props variables
    return (
      <Consumer>
        {value => {
          // pulling the dispatch action from context
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name} {/*toggles the state to show or not show contact card */}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                {/* the delete button */}
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                {/* the edit button*/}
                <Link to={`editcontact:${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {/* Ternary operator for toggling display of contact info*/}
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

// ensures that the right props are passed
// only the "contact" object is being passed from the Contacts component
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
