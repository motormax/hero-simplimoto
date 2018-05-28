import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageUrl from './FinancingOptions.png';
import IMGPage from './IMGPage';

class FinancingIMGOptionsPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="/dashboard-img"
          style={{
            position: 'absolute',
            width: '417px',
            height: '60px',
            top: '708px',
            left: '461px',
          }}
        />
      </IMGPage>
    );
  }
}

export default FinancingIMGOptionsPage;
