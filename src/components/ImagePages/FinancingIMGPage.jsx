import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './Financiación@2x.png';

class FinancingIMGPage extends Component {
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
        <Input
          size="massive"
          style={{
            position: 'absolute',
            top: '394px',
            left: '574px',
            width: '852px',
            height: '74px',
          }}
        />
        <Input
          size="massive"
          style={{
            position: 'absolute',
            top: '569px',
            left: '574px',
            width: '852px',
            height: '74px',
          }}
        />
        <Input
          size="massive"
          style={{
            position: 'absolute',
            top: '569px',
            left: '996px',
            width: '431px',
            height: '74px',
          }}
        />
        <Input
          size="massive"
          style={{
            position: 'absolute',
            top: '759px',
            left: '574px',
            width: '852px',
            height: '74px',
          }}
        />
        <Link to="/financing-loading-img">
          <span
            style={{
              position: 'absolute',
              width: '331px',
              height: '90px',
              top: '894px',
              left: '834px',
            }}
          />
        </Link>
      </div>
    );
  }
}

export default FinancingIMGPage;
