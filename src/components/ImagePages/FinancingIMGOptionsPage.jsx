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
            width: '417px',
            height: '60px',
            top: '708px',
            left: '461px',
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
