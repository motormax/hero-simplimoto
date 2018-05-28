import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './Dashboard01@2x.png';
import IMGPage from './IMGPage';

class Dashboard01IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="customization"
          style={{
            position: 'absolute',
            width: '145.83px',
            height: '31.81px',
            top: '602px',
            left: '618px',
          }}
        />
      </IMGPage>
    );
  }
}

export default Dashboard01IMGPage;
