import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({
  showPlayed,
  playedFilter,
  showResult,
  resultFilter
}) => {
  return (
    <div className="match_filters">

      <div className="match_filters_box">
        <div className="tag">
          Show match
        </div>
        <div className="cont">
          <button
            className={`option ${playedFilter === 'All' ? 'active' : ''}`}
            onClick={() => showPlayed('All')}
          >
            All
          </button>
          <button
            className={`option ${playedFilter === 'Yes' ? 'active' : ''}`}
            onClick={() => showPlayed('Yes')}
          >
            Played
          </button>
          <button
            className={`option ${playedFilter === 'No' ? 'active' : ''}`}
            onClick={() => showPlayed('No')}
          >
            Not played
          </button>
        </div>
      </div>

      <div className="match_filters_box">
        <div className="tag">
          Result game
        </div>
        <div className="cont">
          <button
            className={`option ${resultFilter === 'All' ? 'active' : ''}`}
            onClick={() => showResult('All')}
          > All </button>

          <button
            className={`option ${resultFilter === 'W' ? 'active' : ''}`}
            onClick={() => showResult('W')}
          > W </button>

          <button
            className={`option ${resultFilter === 'L' ? 'active' : ''}`}
            onClick={() => showResult('L')}
          > L </button>

          <button
            className={`option ${resultFilter === 'D' ? 'active' : ''}`}
            onClick={() => showResult('D')}
          > D </button>
        </div>
      </div>

    </div>
  );
};

Filters.propTypes = {
  showPlayed: PropTypes.func,
  playedFilter: PropTypes.string,
  showResult: PropTypes.func,
  resultFilter: PropTypes.string,
};

export default Filters;
