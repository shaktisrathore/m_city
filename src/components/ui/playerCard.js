import React from 'react';
import PropTypes from 'prop-types';

const PlayerCard = ({ name, lastname, number, img }) => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#f2f9ff url(${img})` }}
      />
      <div className="player_card_nfo">
        <div className="player_card_number">
          {number}
        </div>
        <div className="player_card_name">
          <span>{name}</span>
          <span>{lastname}</span>
        </div>
      </div>
    </div>
  );
};

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  img: PropTypes.any.isRequired,
};

export default PlayerCard;
