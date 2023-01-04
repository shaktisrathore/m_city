import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '../../ui/misc';

const TagTitle = ({ children }) => (
  <Tag
    bck='#0e1731'
    size='100px'
    color='#fff'
    add={{
      display: 'inline-block',
      marginBottom: '20px',
    }}
  >{children}</Tag>
);

const TagButton = ({ children }) => (
  <Tag
    link
    linkTo="/the_team"
    bck="#fff"
    size="27px"
    color="#0e1731"
    add={{
      display: 'inline-block',
      marginBottom: '27px',
      border: '1px solid #0e1731'
    }}
    onClick={e => window.scrollTo(0, 0)}
  >{children}</Tag>
);

TagTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

TagButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export { TagTitle, TagButton };
