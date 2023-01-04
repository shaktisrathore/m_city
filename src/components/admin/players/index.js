import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import AdminLayout from '../../../hoc/AdminLayout';
import ProgressBar from '../../ui/ProgressBar';
import THead from './THead';
import TBody from './TBody';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

export default class AdminPlayers extends Component {

  state = {
    isLoading: true,
    players: [],
  }

  componentDidMount() {
    firebasePlayers
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);
        this.setState({
          isLoading: false,
          players: reverseArray(players),
        });
      });
  }

  render() {
    const { isLoading, players } = this.state;

    return (
      <AdminLayout>
        <Paper>
          <Table>
            <THead />
            <TBody players={players} />
          </Table>
        </Paper>
        <ProgressBar isLoading={isLoading} />
      </AdminLayout>
    );
  }
}
