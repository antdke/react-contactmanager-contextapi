import React, { Component } from 'react';
import Contact from './Contact';

// Context API
import { Consumer } from '../../context';

// a "smart" component because it possesses state
export class Contacts extends Component {
  render() {
    return (
      // Consumer is used to give the component access to the state
      <Consumer>
        {value => {
          // Destructuring - pulling contacts obj from state that's being passed down w/in the values variable
          const { contacts } = value;

          // displaying each contact card by using map to loop through the list of objects in the state
          return (
            // React Fragment is used to not clutter the DOM with unneccesary <div> tag
            <React.Fragment>
              {/* Titile */}
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
