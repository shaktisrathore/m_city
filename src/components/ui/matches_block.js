import React from 'react';
import PropTypes from 'prop-types';

const MatchesBlock = ({ match }) => {
  return (
    <div className="match_block">
      <div className="match_date">
        {match.final ? match.date : `Match not played yet: ${match.date}`}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div className="icon" style={{ background: `url(/team_icons/${match.localThmb}.png)` }}></div>
            <span className="team_name">{match.local}</span>
          </div>
          <div className="right">
            {match.final ? match.resultLocal : '-'}
          </div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div className="icon" style={{ background: `url(/team_icons/${match.awayThmb}.png)` }}></div>
            <span className="team_name">{match.away}</span>
          </div>
          <div className="right">
            {match.final ? match.resultAway : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

MatchesBlock.propTypes = {
  match: PropTypes.object,
};

export default MatchesBlock;
