import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  user,
  path,
  exact = false,
  component: Comp,
}) => {
  // ...props includes match, history and other usefull objects
  return (
    <Route path={path} exact={exact} component={props => (
      user ?
        <Comp {...props} user={user} /> :
        <Redirect to='/sign_in/' />
    )} />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.object,
  component: PropTypes.func,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default PrivateRoute;
