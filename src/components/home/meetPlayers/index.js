import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import { TagTitle, TagButton } from './Tags';
import HomeCards from './cards';

import Stripes from '../../../Resources/images/stripes.png';

export default class MeetPlayers extends Component {

  state = {
    show: false,
  }

  render() {
    const { show } = this.state;
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({ show: true });
        }}
      >
        <div
          className='home_meetplayers'
          style={{
            background: `#fff url(${Stripes})`
          }}
        >
          <div className='container'>
            <div className='home_meetplayers_wrapper'>
              <div className='home_card_wrapper'>
                <HomeCards
                  show={show}
                />
              </div>
              <div className='home_text_wrapper'>
                <TagTitle>Meet</TagTitle>
                <TagTitle>The</TagTitle>
                <TagTitle>Players</TagTitle>
                <TagButton>Meet them here</TagButton>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}
