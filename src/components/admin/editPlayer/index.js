import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../../../hoc/AdminLayout';

import Form from './Form';
import { validate } from '../../ui/misc';
import { firebase, firebaseDB, firebasePlayers } from '../../../firebase';

export default class EditPlayer extends Component {

  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Lastname',
          name: 'lastname_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number_input',
          type: 'number',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' },
            { key: 'Trainer', value: 'Trainer' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    }
  }

  handleChange = (element, content = '') => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }


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

  submitForm = e => {
    e.preventDefault();

    const { playerId, formData, formType } = this.state;
    const { history } = this.props;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    if (isFormValid) {

      if (formType === 'Edit player') {

        firebaseDB
          .ref(`players/${playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update correctly');
          })
          .catch(() => {
            this.setState({
              formError: true,
            });
          });

      } else {
        firebasePlayers.push(dataToSubmit)
          .then(() => {
            history.push('/admin_players');
          })
          .catch(() => {
            this.setState({ formError: true });
          });
      }

    } else {
      this.setState({ formError: true });
    }
  }

  successForm(message) {
    this.setState({
      formSuccess: message,
    });

    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000);
  }

  resetImg = () => {
    const newFormData = { ...this.state.formData };
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData,
    });
  }

  storeFilename = fn => {
    this.handleChange({
      id: 'image'
    }, fn);
  }

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData,
    });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const playerId = params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add player'
      });
    } else {
      // load player data
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();

          // get img from firebase
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit player', url);
            })
            .catch(() => {
              this.updateFields({ ...playerData, image: '' }, playerId, 'Edit player', '');
            });
        });

    }
  }

  render() {
    const {
      formData,
      formType,
      formError,
      formSuccess,
      defaultImg,
    } = this.state;

    return (
      <AdminLayout>
        <Form
          {...formData}
          formType={formType}
          formError={formError}
          formSuccess={formSuccess}
          defaultImg={defaultImg}
          handleChange={this.handleChange}
          submitForm={this.submitForm}
          resetImg={this.resetImg}
          storeFilename={this.storeFilename}
        />
      </AdminLayout>
    );
  }
}

EditPlayer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
