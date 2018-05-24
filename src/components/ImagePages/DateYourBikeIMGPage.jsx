import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class DateYourBike extends Component {
  render() {
    return (
      <div style={{
        width: '1338px',
        margin: 'auto',
        position: 'relative',
      }}
      >
        <img
          style={{
          position: 'relative',
          display: 'block',
          width: '1338px',
        }}
          src={`${process.env.PUBLIC_URL}/img/DateYourBike.png`}
        />
        <input
          style={{
          position: 'absolute', width: '570px', height: '49px', top: '545px', left: '384px',
        }}
        />
        <a
          style={{
           position: 'absolute',
           width: '370px',
           height: '61px',
           left: '485px',
           top: '663px',
          }}
          href="dashboard-img"
        />
      </div>
    );
  }
}

export default DateYourBike;
