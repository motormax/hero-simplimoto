import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './Home@2x.png';
import IMGPage from './IMGPage';

class HomeIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="dashboard-img"
          style={{
            position: 'absolute',
            width: '166px',
            height: '52px',
            top: '689px',
            left: '428px',
          }}
        />
        <Link
          to="livetour-img"
          style={{
            position: 'absolute',
            width: '100px',
            height: '35px',
            top: '747px',
            left: '396px',
          }}
        />
        <Link
          to="dateyourbike-img"
          style={{
            position: 'absolute',
            width: '135px',
            height: '29px',
            top: '750px',
            left: '504px',
          }}
        />
      </IMGPage>
    );
  }
}

export default HomeIMGPage;
