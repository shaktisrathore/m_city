import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import { CityLogo } from '../ui/icons';

const style = {
  show: {
    transform: 'translateY(0)',
    transition: 'transform .5s',
  },
  hide: {
    transform: 'translateY(-110%)',
    transition: 'transform .5s',
  },
};

export default class Header extends Component {

  state = {
    shouldShow: null,
    lastScroll: null,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScroll: prevScroll, shouldShow: prevShouldShow } = this.state;
    const currScroll = window.scrollY;

    if (currScroll === prevScroll) {
      return;
    }

    const shouldShow = (prevScroll !== null && currScroll > 74) ? (currScroll < prevScroll) : null;

    if (shouldShow !== prevShouldShow) {
      this.setState(prevState => ({
        ...prevState,
        shouldShow,
      }));
    }

    this.setState({ lastScroll: currScroll });
  }

  render() {
    const { shouldShow } = this.state;
    const { hide, show } = style;

    // if you scroll down - menu will hide and vice versa
    const menuState = shouldShow === null ? '' : (shouldShow ? show : hide);

    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#98c5e9',
          boxShadow: 'none',
          padding: '10px 0',
          borderBottom: '2px solid #00285e',
          ...menuState,
        }}
      >
        <Toolbar variant="dense" style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <CityLogo link linkTo="/" width="70px" height="70px" />
            </div>
          </div>

          <Link to="/the_team">
            <Button color="inherit">The team</Button>
          </Link>
          <Link to="/the_matches">
            <Button color="inherit">Matches</Button>
          </Link>

        </Toolbar>
      </AppBar>
    );
  }
}
