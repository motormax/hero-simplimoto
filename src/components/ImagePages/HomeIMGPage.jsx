import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './Home.png';
import IMGPage from './IMGPage';

class HomeIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="dashboard-img"
          style={{
            position: 'absolute',
            width: '158.12px',
            height: '46.59px',
            top: '659.74px',
            left: '409.97px',
          }}
        />
      </IMGPage>
    );
  }
}

export default HomeIMGPage;
