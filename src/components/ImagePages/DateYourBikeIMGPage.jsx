import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './img/DateYourBike@2x.png';
import IMGPage from './IMGPage';


class DateYourBike extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Input
          size="huge"
          style={{
            position: 'absolute',
            width: 544 - 20,
            left: 368 + 20,
            height: 45,
            top: 545,
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
        <Link
          to="/bikesent-img"
          style={{
            position: 'absolute',
            width: 352.58,
            height: 55.93,
            top: 1037.98,
            left: 464,
          }}
        />
        <Link // cancel and go back to dashboard
          to="/dashboard-img"
          style={{
            position: 'absolute',
            width: '328px',
            height: '42px',
            left: '32px',
            top: '20px',
          }}
        />
      </IMGPage>
    );
  }
}

export default DateYourBike;
