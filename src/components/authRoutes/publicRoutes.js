import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const publicRoutes = ({
  user,
  component: Comp,
  path,
  exact = false,
  restricted
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      component={props => (
        // restricted === true means you should't see component when registered
        (restricted && user) ?
          <Redirect to='/dashboard' /> :
          <Comp {...props} user={user} />
      )}
    />
  );
};

publicRoutes.propTypes = {
  user: PropTypes.object,
  component: PropTypes.func,
  path: PropTypes.string,
  restricted: PropTypes.bool,
  exact: PropTypes.bool,
};

export default publicRoutes;
