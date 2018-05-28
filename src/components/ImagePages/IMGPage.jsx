import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class IMGPage extends Component {
  static propTypes = {
    imgUrl: propTypes.string.isRequired,
    children: propTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div
        style={{
          margin: 'auto',
          position: 'relative',
          display: 'block',
          width: '1338px',
          textAlign: 'center',
        }}
      >
        <img
          src={this.props.imgUrl}
          alt=""
          style={{
            display: 'inline',
            width: '100%',
          }}
        />
        {this.props.children}
      </div>
    );
  }
}
