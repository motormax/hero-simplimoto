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
            width: '172px',
            height: '37px',
            top: '180px',
            left: '626px',
          }}
        />
        <Link
          to="financing-img"
          style={{
            position: 'absolute',
            width: '137px',
            height: '39px',
            top: '424px',
            left: '649px',
          }}
        />
      </IMGPage>
    );
  }
}

export default Dashboard01IMGPage;
