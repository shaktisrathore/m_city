import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';
import PlayerCard from '../../ui/playerCard';

import Otamendi from '../../../Resources/images/players/Otamendi.png';

export default class HomeCards extends Component {

  state = {
    cards: [
      {
        bottom: 90,
        left: 300,
      },
      {
        bottom: 60,
        left: 200,
      },
      {
        bottom: 30,
        left: 100,
      },
      {
        bottom: 0,
        left: 0,
      },
    ]
  }

  showAnimateCards = () => (
    this.state.cards.map(({ left, bottom }) => (
      <Animate
        key={bottom}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0,
        }}

        enter={{
          left: [left],
          bottom: [bottom],
          timing: { duration: 500, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: 'absolute',
                left,
                bottom,
              }}
            >
              <PlayerCard
                name="Nicolas"
                number="30"
                lastname="Otamendi"
                img={Otamendi}
              />
            </div>
          );
        }}
      </Animate>
    ))
  )

  render() {
    return (
      <div>
        {this.showAnimateCards()}
      </div>
    );
  }
}

HomeCards.propTypes = {
  show: PropTypes.bool.isRequired,
};
