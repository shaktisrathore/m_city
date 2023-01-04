import React, { Component } from 'react';
import PlayerCard from '../ui/playerCard';
import ProgressBar from '../ui/ProgressBar';
import Fade from 'react-reveal/Fade';

import Stripes from '../../Resources/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js';

export default class Team extends Component {

  constructor(props) {
    super(props);
    // fix the scroll position when you click to the link button 
    // in react router
    window.scrollTo(0, 0);
  }

  state = {
    isLoading: true,
    players: [],
    categories: [
      'Trainer',
      'Keeper',
      'Defence',
      'Midfield',
      'Striker'
    ]
  }

  componentDidMount() {
    firebasePlayers
      .once('value')
      .then(snapshot => {
        const players = firebaseLooper(snapshot);
        let promises = [];

        for (let key in players) {
          promises.push(
            new Promise(res => {
              firebase
                .storage().ref('players')
                .child(players[key].image).getDownloadURL()
                .then(url => {
                  players[key].url = url;
                  res();
                });
            })
          );
        }

        Promise.all(promises)
          .then(() => {
            this.setState({ isLoading: false, players });
          });
      });
  }

  showPlayersByCategory = category => {
    const { players } = this.state;
    return (
      // is players loaded
      players ?
        players.map(({
          id,
          name,
          lastname,
          number,
          position,
          url,
        }, index) => {
          return position === category ?
            <Fade left delay={index * 20} key={id}>
              <div className="item">
                <PlayerCard
                  name={name}
                  lastname={lastname}
                  number={number}
                  img={url}
                />
              </div>
            </Fade> :
            '';
        }) :
        ''
    );
  }

  render() {
    const { categories, isLoading } = this.state;

    return (
      <div className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {
          !isLoading ?
            <>
              {
                categories.map(category => (
                  <div className="team_category_wrapper" key={category}>
                    <div className="title">
                      {`${category}s`}
                    </div>
                    <div className="team_cards">
                      {this.showPlayersByCategory(category)}
                    </div>
                  </div>
                ))
              }
            </> :
            <ProgressBar isLoading={isLoading} />
        }
      </div>
    );
  }
}
