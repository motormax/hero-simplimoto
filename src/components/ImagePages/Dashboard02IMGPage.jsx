import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imageUrl from './Dashboard02@2x.png';
import IMGPage from './IMGPage';

// In this dashboard only the financing step is completed

class Dashboard02IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="dateyourbike-img"
          style={{
            position: 'absolute',
            width: '172px',
            height: '37px',
            top: '222px',
            left: '626px',
          }}
        />
      </IMGPage>
    );
  }
}

export default Dashboard02IMGPage;
