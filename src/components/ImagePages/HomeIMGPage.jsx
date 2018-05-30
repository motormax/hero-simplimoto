import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './img/Home@2x.png';
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
            left: '409.97px',
            height: '46.59px',
            top: '659.74px',
          }}
        />
        <Link
          to="livetour-img"
          style={{
            position: 'absolute',
            width: 92.49,
            left: 373.85,
            height: 30.92,
            top: 716.01,

          }}
        />
        <Link
          to="dateyourbike-img"
          style={{
            position: 'absolute',
            width: 122.33,
            left: 478,
            height: 27,
            top: 718,
          }}
        />
      </IMGPage>
    );
  }
}

export default HomeIMGPage;
