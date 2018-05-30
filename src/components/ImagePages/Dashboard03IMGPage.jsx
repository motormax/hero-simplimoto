import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './img/Dashboard03@2x.png';
import IMGPage from './IMGPage';

// In this dashboard the reservation is/should be payed

class Dashboard03IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="customization-img"
          style={{
            position: 'absolute',
            width: 130,
            height: 35,
            top: 604,
            left: 633,
          }}
        />
      </IMGPage>
    );
  }
}
export default Dashboard03IMGPage;
