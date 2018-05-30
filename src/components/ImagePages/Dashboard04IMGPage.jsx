import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './img/Dashboard04@2x.png';
import IMGPage from './IMGPage';

// In this dashboard the reservation is payed

class Dashboard04IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="insurance-img"
          style={{
            position: 'absolute',
            width: 222,
            left: 991,
            height: 44,
            top: 590,
          }}
        />
      </IMGPage>
    );
  }
}

export default Dashboard04IMGPage;
