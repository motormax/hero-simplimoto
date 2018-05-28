import React, { Component } from 'react';

export default class IMGPage extends Component {
  renderImg(imgUrl, inner) {
    return (
      <div style={{
        margin: 'auto',
        position: 'relative',
        width: '1338px',
        textAlign: 'center',
      }}
      >
        <img
          src={imgUrl}
          alt=""
          style={{
            display: 'inline',
            width: '100%',
            position: 'relative',
          }}
        />
        {inner}
      </div>
    );
  }
}
