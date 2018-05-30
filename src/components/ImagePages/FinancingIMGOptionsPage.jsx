import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './img/FinancingOptions.png';
import IMGPage from './IMGPage';

class FinancingIMGOptionsPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="/dashboard2-img"
          style={{
            position: 'absolute',
            width: 398,
            left: 441,
            height: 55.93,
            top: 662.98,
          }}
        />
        <Link // cancel and go back to dashboard
          to="/dashboard-img"
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

export default FinancingIMGOptionsPage;
