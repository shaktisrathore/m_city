import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TBody = ({ matches }) => {
  return (
    <TableBody>
      {
        matches ?
          matches.map(match => (
            <TableRow key={match.id}>
              <TableCell>
                {match.date}
              </TableCell>
              <TableCell>
                <Link to={`admin_matches/edit_match/${match.id}`}>
                  {match.away} <strong>-</strong> {match.local}
                </Link>
              </TableCell>
              <TableCell>
                {match.resultAway} <strong>-</strong> {match.resultLocal}
              </TableCell>
              <TableCell>
                {
                  match.final === 'Yes' ?
                    <span className="matches_tag_red">
                      Final
                    </span> :
                    <span className="matches_tag_green">
                      Not played yet
                    </span>
                }
              </TableCell>
            </TableRow>
          )) :
          null
      }
    </TableBody>
  );
};

TBody.propTypes = {
  matches: PropTypes.array,
};

export default TBody;
