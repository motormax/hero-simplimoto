import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './DateYourBike@2x.png';
import IMGPage from './IMGPage';


class DateYourBike extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <span>
          <Input
            size="massive"
            style={{
            position: 'absolute',
            width: '570px',
            height: '49px',
            top: '569px',
            left: '405px',
            border: 'none',
            background: 'transparent',
          }}
          >
            <input style={{
            border: 'none',
            background: 'transparent',
          }}
            />
          </Input>
          <Link to="/dashboard-img">
            <span
              style={{
              position: 'absolute',
              width: '369px',
              height: '58px',
              left: '485px',
              top: '1064px',
            }}
            />
          </Link>
        </span>
      </IMGPage>
    );
  }
}

export default DateYourBike;
