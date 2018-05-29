import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './BikeSent@2x.png';
import IMGPage from './IMGPage';


class BikeSentIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="/dashboard-img"
          style={{
            position: 'absolute',
            width: '369px',
            height: '59px',
            left: '485px',
            top: '677px',
          }}
          dfsdkj
        />
        <Link
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

export default BikeSentIMGPage;
