import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './img/BikeSent@2x.png';
import IMGPage from './IMGPage';


class BikeSentIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="/dashboard3-img"
          style={{
            position: 'absolute',
            width: 352.58,
            left: 472,
            height: 55.93,
            top: 647.98,
          }}
        />
        <Link // cancel and go back to dashboard
          to="/dashboard2-img"
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

export default BikeSentIMGPage;
