import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressBar = ({ isLoading }) => {
  return (
    <div
      className="admin_progress"
      style={{ textAlign: 'center', margin: '0 30px' }}
    >
      {
        isLoading ?
          <CircularProgress
            thickness={7}
            style={{
              color: '#98c5e9'
            }}
          /> :
          ''
      }
    </div>
  );
};

ProgressBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default ProgressBar;
