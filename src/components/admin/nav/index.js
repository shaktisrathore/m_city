/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

import { firebase } from '../../../firebase';

const AdminNav = () => {

  const Links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches',
    },
    {
      title: 'Add Match',
      linkTo: '/admin_matches/edit_match',
    },
    {
      title: 'Players',
      linkTo: '/admin_players',
    },
    {
      title: 'Add Player',
      linkTo: '/admin_players/edit_player',
    },
  ];

  const style = {
    color: '#fff',
    fontWeight: '300',
    borderBottom: '1px solid #353535',
  };

  const renderItems = () => (
    Links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem
          button
          style={style}
        >{link.title}</ListItem>
      </Link>
    ))
  );

  const logoutHandler = () => {
    firebase.auth().signOut().then(() => {
      console.log('log out succesful');
    }, error => {
      console.log('error loging out', error);
    });
  };

  return (
    <div className="">
      {renderItems()}
      <ListItem
        button
        style={style}
        onClick={() => logoutHandler()}
      >
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
