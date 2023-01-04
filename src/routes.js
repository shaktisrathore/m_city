import React from 'react';
import PropTypes from 'prop-types';
import Layout from './hoc/Layout';
import { Switch } from 'react-router-dom';

import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';

import Home from './components/home';
import SignIn from './components/signIn';
import Team from './components/team';
import Matches from './components/matches';
import NotFound from './components/ui/notFound';

import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import EditMatch from './components/admin/editMatch';
import AdminPlayers from './components/admin/players';
import EditPlayer from './components/admin/editPlayer';

const Routes = ({ user }) => {
  return (
    <Layout>
      <Switch>
        <PublicRoute
          exact
          restricted={false}
          user={user}
          component={Home}
          path="/"
        />

        <PublicRoute
          exact
          restricted
          user={user}
          path="/sign_in"
          component={SignIn}
        />

        <PublicRoute
          exact
          restricted={false}
          user={user}
          path="/the_team"
          component={Team}
        />

        <PublicRoute
          exact
          restricted={false}
          user={user}
          path="/the_matches"
          component={Matches}
        />

        <PrivateRoute
          exact
          user={user}
          path="/dashboard"
          component={Dashboard}
        />

        <PrivateRoute
          exact
          user={user}
          path="/admin_matches"
          component={AdminMatches}
        />

        <PrivateRoute
          user={user}
          exact
          path={'/admin_matches/edit_match'}
          component={EditMatch}
        />

        <PrivateRoute
          user={user}
          exact
          path={'/admin_matches/edit_match/:id'}
          component={EditMatch}
        />

        <PrivateRoute
          user={user}
          exact
          path={'/admin_players'}
          component={AdminPlayers}
        />

        <PrivateRoute
          user={user}
          exact
          path={'/admin_players/edit_player'}
          component={EditPlayer}
        />

        <PrivateRoute
          user={user}
          exact
          path={'/admin_players/edit_player/:id'}
          component={EditPlayer}
        />

        <PublicRoute
          restricted={false}
          user={user}
          component={NotFound}
        />
      </Switch>
    </Layout>
  );
};

Routes.propTypes = {
  user: PropTypes.object,
};

export default Routes;
