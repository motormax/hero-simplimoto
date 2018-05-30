import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './img/Dashboard01@2x.png';
import IMGPage from './IMGPage';

// In this dashboard no step is completed

class Dashboard01IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="livetour-img"
          style={{
            position: 'absolute',
            width: 164,
            height: 35,
            top: 172,
            left: 599,
          }}
        />
        <Link
          to="financing-img"
          style={{
            position: 'absolute',
            width: 130,
            height: 35,
            top: 407,
            left: 633,
          }}
        />
      </IMGPage>
    );
  }
}

export default Dashboard01IMGPage;
