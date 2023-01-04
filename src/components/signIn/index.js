import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../firebase';

import FormField from '../ui/formFields';
import { validate } from '../ui/misc';

export default class SignIn extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  }

  handleChange(element) {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    // validation
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData,
      formError: false,
    });
  }

  submitForm(e) {
    e.preventDefault();

    const { formData } = this.state;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    if (isFormValid) {

      firebase
        .auth()
        .signInWithEmailAndPassword(
          dataToSubmit.email,
          dataToSubmit.password
        ).then(() => {
          this.props.history.push('/dashboard');
        }).catch(error => {
          this.setState({
            formError: error,
          });
        });

    } else {
      this.setState({ formError: true });
    }
  }

  render() {
    const {
      formData: { email, password },
      formError,
    } = this.state;

    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={e => this.submitForm(e)}>
            <h2>Please Login</h2>
            <FormField
              id='email'
              formData={email}
              handleChange={element => this.handleChange(element)}
            />

            <FormField
              id='password'
              formData={password}
              handleChange={element => this.handleChange(element)}
            />
            {
              formError ?
                <div className="error_label">
                  Something is wrong, try again.
                </div> :
                ''
            }
            <button type="submit" onClick={e => this.submitForm(e)}>
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.any,
};
