import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './img/Dashboard05@2x.png';
import IMGPage from './IMGPage';

// In this dashboard the reservation is payed

class Dashboard05IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="success-img"
          style={{
            position: 'absolute',
            width: 307,
            height: 68,
            top: 679,
            left: 869,
          }}
        />
      </IMGPage>
    );
  }
}
export default Dashboard05IMGPage;
