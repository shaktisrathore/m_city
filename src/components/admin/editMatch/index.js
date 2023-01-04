import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../../../hoc/AdminLayout';

import Form from './Form';
import { validate } from '../../ui/misc';

import { firebaseDB, firebaseTeams, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

export default class EditMatch extends Component {
  // i recommend you to roll up the state 
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select an away team',
          name: 'select_away',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away',
          name: 'result_away_input',
          type: 'text',
        },
        validation: {
          required: false,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played',
          name: 'select_played',
          type: 'select',
          options: [
            { key: 'No', value: 'No' },
            { key: 'Yes', value: 'Yes' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  }

  handleChange = element => {
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

  submitForm = e => {
    e.preventDefault();

    const { matchId, formData, teams, formType } = this.state;
    const { history } = this.props;

    let dataToSubmit = {};
    let isFormValid = true;

    for (let key in formData) {
      dataToSubmit[key] = formData[key].value;
      isFormValid = formData[key].valid && isFormValid;
    }

    teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit['localThmb'] = team.thmb;
      }

      if (team.shortName === dataToSubmit.away) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });

    if (isFormValid) {
      if (formType === 'Edit Match') {
        firebaseDB
          .ref(`matches/${matchId}`)
          .update(dataToSubmit)
          .then(() => { this.successForm('Updated correctly'); })
          .catch(() => this.setState({ formError: true }));
      } else {
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            history.push('/admin_matches');
          })
          .catch(() => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  }

  // if ypu need edit => fill all field
  updateFields(match, matchId, teamsOptions, teams, type) {
    const { formData } = this.state;
    const newFormData = {
      ...formData,
    };

    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamsOptions;
      }
    }

    this.setState({
      matchId,
      teams,
      formType: type,
      formData: newFormData,
    });
  }

  // upload teams from firebase
  getTeams = (match, matchId, type) => {
    firebaseTeams
      .once('value')
      .then(snapshot => {
        const teams = firebaseLooper(snapshot);

        const teamsOptions = teams.reduce((prev, curr) => {
          return [...prev,
            { key: curr.shortName, value: curr.name }
          ];
        }, []);

        this.updateFields(match, matchId, teamsOptions, teams, type);
      });
  };

  componentDidMount() {
    const { match } = this.props;
    const matchId = match.params.id;

    if (!matchId) {
      this.getTeams(false, null, 'Add Match');
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();
          this.getTeams(match, matchId, 'Edit Match');
        });
    }
  }

  render() {
    const {
      formData,
      formType,
      formError,
      formSuccess,
    } = this.state;

    return (
      <AdminLayout>
        <Form
          {...formData}
          formType={formType}
          formError={formError}
          formSuccess={formSuccess}
          handleChange={this.handleChange}
          submitForm={this.submitForm}
        />
      </AdminLayout>
    );
  }
}

EditMatch.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
