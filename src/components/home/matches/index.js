import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag
          bck="#0e1731"
          size="50px"
          color="#fff"
          // spec styles
          add={{}}
        > Matches </Tag>

        <Blocks />

        <Tag
          link
          linkTo="/the_matches"
          bck="#fff"
          size="22px"
          color="#0e1731"
        >
          More matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;
