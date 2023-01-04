import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TBody = ({ players }) => {
  return (
    <TableBody>
      {
        players ?
          players.map(player => (
            <TableRow key={player.id}>
              <TableCell>
                <Link to={`/admin_players/edit_player/${player.id}`}>
                  {player.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/admin_players/edit_player/${player.id}`}>
                  {player.lastname}
                </Link>
              </TableCell>
              <TableCell>
                {player.number}
              </TableCell>
              <TableCell>
                {player.position}
              </TableCell>
            </TableRow>
          )) :
          null
      }
    </TableBody>
  );
};

TBody.propTypes = {
  players: PropTypes.array,
};

export default TBody;
