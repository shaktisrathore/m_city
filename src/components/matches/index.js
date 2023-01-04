import React, { Component } from 'react';

import ProgressBar from '../ui/ProgressBar';
import Filters from './Filters';
import LeagueTable from './Table';
import MatchesList from './MatchesList';

import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

export default class Matches extends Component {

  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    playedFilter: 'All',
    resultFilter: 'All',
  }

  showPlayed = filter => {
    const { matches } = this.state;
    let filterMatches = matches.filter(match => {
      return match.final === filter;
    });
    if (filter === 'All') filterMatches = matches;
    this.setState({
      filterMatches,
      playedFilter: filter,
      resultFilter: 'All'
    });
  }

  showResult = result => {
    const { matches } = this.state;

    let resultMatches = matches.filter(match => {
      return match.result === result;
    });
    if (result === 'All') resultMatches = matches;
    this.setState({
      filterMatches: resultMatches,
      resultFilter: result,
      playedFilter: 'All',
    });
  }

  componentDidMount() {
    firebaseMatches
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);

        this.setState({
          isLoading: false,
          matches: reverseArray(matches),
          filterMatches: reverseArray(matches),
        });
      });
  }

  render() {
    const {
      isLoading,
      filterMatches,
      playedFilter,
      resultFilter
    } = this.state;

    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <Filters
              showPlayed={this.showPlayed}
              playedFilter={playedFilter}
              showResult={this.showResult}
              resultFilter={resultFilter}
            />
            {
              !isLoading ?
                <MatchesList matches={filterMatches} /> :
                <ProgressBar isLoading={isLoading} />
            }
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}
