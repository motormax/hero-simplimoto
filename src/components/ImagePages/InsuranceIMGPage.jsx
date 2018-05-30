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
            width: 370.58,
            left: 455,
            height: 55.93,
            top: 647.98,
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
