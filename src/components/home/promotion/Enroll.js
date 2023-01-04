import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebasePromotions } from '../../../firebase';
export default class Enroll extends Component {

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

  resetForm(condition) {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }

    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: condition ? 'Congratulations' : 'Already on the database',
    });

    this.clearSuccessMessage();
  }

  checkDatabase(dataToSubmit) {
    firebasePromotions
      .orderByChild('email')
      .equalTo(dataToSubmit.email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() === null) {
          firebasePromotions.push(dataToSubmit);
          this.resetForm(true);
        } else {
          this.resetForm(false);
        }
      });
  }

  clearSuccessMessage() {
    setTimeout(() => {
      this.setState({ formSuccess: '' });
    }, 2000);
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
      this.checkDatabase(dataToSubmit);
    } else {
      this.setState({ formError: true });
    }
  }

  render() {

    const { formData: { email }, formError, formSuccess } = this.state;

    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={e => this.submitForm(e)}>
            <h3 className="enroll_title">Enter your email</h3>
            <div className="enroll_input">
              <FormField
                id='email'
                formData={email}
                handleChange={element => this.handleChange(element)}
              />
              {
                formError ?
                  <div className="error_label">
                    Something is wrong, try again.
                  </div> :
                  ''
              }
              <div className="success_label">
                {formSuccess}
              </div>
              <button type="submit" onClick={e => this.submitForm(e)}>
                Enroll
              </button>
              <p className="enroll_discl">
                Some disclaimer text
              </p>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}
