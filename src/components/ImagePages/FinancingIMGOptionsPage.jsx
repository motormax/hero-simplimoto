import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './FinancingOptions.png';

class FinancingIMGOptionsPage extends Component {
  render() {
    return (
      <div style={{
        margin: 'auto',
        position: 'relative',
        width: '2000px',
        textAlign: 'center',
      }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            display: 'inline',
            width: '100%',
            position: 'relative',
          }}
        />
        <Link to="/dashboard-img">
          <span
            style={{
              position: 'absolute',
              width: '624px',
              height: '93px',
              top: '1057px',
              left: '688px',
            }}
          />
        </Link>
      </div>
    );
  }
}

export default FinancingIMGOptionsPage;
