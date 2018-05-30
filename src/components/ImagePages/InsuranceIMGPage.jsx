import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IMGPage from './IMGPage';
import imageUrl from './img/Insurance.png';

class InsuranceIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="dashboard5-img"
          style={{
            position: 'absolute',
            top: 677,
            left: 487,
            width: 364,
            height: 60,
          }}
        />
        <Link // cancel and go back to dashboard
          to="/dashboard4-img"
          style={{
            position: 'absolute',
            width: '328px',
            height: '42px',
            left: '32px',
            top: '20px',
          }}
        />
      </IMGPage>
    );
  }
}

export default InsuranceIMGPage;
