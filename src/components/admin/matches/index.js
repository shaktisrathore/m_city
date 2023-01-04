import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import AdminLayout from '../../../hoc/AdminLayout';
import ProgressBar from '../../ui/ProgressBar';
import THead from './THead';
import TBody from './TBody';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

export default class AdminMatches extends Component {

  state = {
    isLoading: true,
    matches: [],
  }

  componentDidMount() {
    firebaseMatches
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          isLoading: false,
          matches: reverseArray(matches),
        });
      });
  }

  render() {
    const { isLoading, matches } = this.state;

    return (
      <AdminLayout>
        <Paper>
          <Table>
            <THead />
            <TBody matches={matches} />
          </Table>
        </Paper>
        <ProgressBar isLoading={isLoading} />
      </AdminLayout>
    );
  }
}
