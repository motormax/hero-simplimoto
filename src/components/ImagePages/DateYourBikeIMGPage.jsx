import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './DateYourBike.png';
import IMGPage from './IMGPage';


class DateYourBike extends IMGPage {
  render() {
    return this.renderImg(
      imageUrl,
      <span>
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
      </span>,
    );
  }
}

export default DateYourBike;
