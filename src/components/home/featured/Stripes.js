import React, { Component } from 'react';
import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';

export default class Stripes extends Component {

  state = {
    stripes: [
      {
        background: '#98c5e9',
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0,
      },
      {
        background: '#fff',
        left: 360,
        rotate: 25,
        top: -397,
        delay: 200,
      },
      {
        background: '#98c5e9',
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400,
      },
    ]
  }

  showStripes = () => {
    const { stripes } = this.state;
    return (
      stripes.map((stripe, i) => {
        const { background, left, top, rotate } = stripe;
        return (
          <Animate
            show
            key={i}
            // start props for every elem
            start={{
              background: '#fff',
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            // prop when elem is entered. so we transitioning it
            enter={{
              background,
              timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
              opacity: [1],
              top: [top],
              left: [left],
              rotate: [rotate],
              events: {
                end() {
                  // animation ends
                }
              },
            }}
          >
            {({ background, opacity, top, left, rotate }) => {
              // above we get state from enter
              return (
                <div
                  className="stripe"
                  style={{
                    background,
                    opacity,
                    transform: `rotate(${rotate.toFixed(2)}deg) translate(${left.toFixed(2)}px, ${top.toFixed(2)}px)`,
                  }}
                >
                </div>
              );
            }}
          </Animate>
        );
      })
    );
  }

  render() {
    return (
      <div className="featured_stripes">
        {this.showStripes()}
      </div>
    );
  }
}
