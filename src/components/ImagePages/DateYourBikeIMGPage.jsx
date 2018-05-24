import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './DateYourBike.png';

class DateYourBike extends Component {
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
            width: '852px',
            height: '73px',
            top: '814px',
            left: '574px',
        }}
        />
        <Link to="/dashboard-img">
          <span
            style={{
              position: 'absolute',
              width: '552px',
              height: '88px',
              left: '725px',
              top: '992px',
          }}
          />
        </Link>
      </div>
    );
  }
}

export default DateYourBike;
