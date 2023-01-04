import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NodeGroup from 'react-move/NodeGroup';
import { easePolyOut } from 'd3-ease';

export default class MatchesList extends Component {

  state = {
    matchesList: [],
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    return state = {
      matchesList: props.matches,
    };
  }

  showMatches = () => {
    const { matchesList } = this.state;

    return (
      matchesList ?
        <NodeGroup
          data={matchesList}
          keyAccessor={d => d.id}

          start={() => ({
            opacity: 0,
            x: -200,
          })}

          enter={(d, i) => ({
            opacity: [1],
            x: [0],
            timing: {
              duration: 500,
              delay: i * 50,
              ease: easePolyOut
            }
          })}

          update={(d, i) => ({
            opacity: [1],
            x: [0],
            timing: {
              duration: 500,
              delay: i * 50,
              ease: easePolyOut
            }
          })}

          leave={(d, i) => ({
            opacity: [0],
            x: [-200],
            timing: {
              duration: 500,
              delay: i * 50,
              ease: easePolyOut
            }
          })}
        >
          {nodes => (
            <>
              {nodes.map(({
                key,
                data,
                state: { x, opacity }
              }) => (
                <div
                  className="match_box_big"
                  key={key}
                  style={{
                    opacity,
                    transform: `translate(${x}px)`
                  }}
                >
                  <div className="block_wrapper">
                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(team_icons/${data.localThmb}.png)`
                        }}
                      ></div>
                      <div className="team">{data.local}</div>
                      <div className="result">{data.resultLocal}</div>
                    </div>

                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(team_icons/${data.awayThmb}.png)`
                        }}
                      ></div>
                      <div className="team">{data.away}</div>
                      <div className="result">{data.resultAway}</div>
                    </div>
                  </div>

                  <div className="block_wrapper nfo">
                    <p><strong>Date: </strong>{data.date}</p>
                    <p><strong>Stadium: </strong>{data.stadium}</p>
                    <p><strong>Referee: </strong>{data.referee}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </NodeGroup> :
        ''
    );
  }

  render() {
    return (
      <div>
        {this.showMatches()}
      </div>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.array,
};
