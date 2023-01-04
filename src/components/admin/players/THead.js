import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const THead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>First name</TableCell>
        <TableCell>Last name</TableCell>
        <TableCell>Number</TableCell>
        <TableCell>Position</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default THead;
