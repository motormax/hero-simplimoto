import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IMGPage from './IMGPage';
import imageUrl from './img/Insurance.png';

class InsuranceIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="dashboard-img"
          style={{
            position: 'absolute',
            top: 677,
            left: 487,
            width: 364,
            height: 60,
          }}
        />
      </IMGPage>
    );
  }
}

export default InsuranceIMGPage;
