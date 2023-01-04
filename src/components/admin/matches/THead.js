import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const THead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Match</TableCell>
        <TableCell>Result</TableCell>
        <TableCell>Final</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default THead;
