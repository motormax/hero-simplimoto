import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import imageUrl from './img/Financiación@2x.png';
import IMGPage from './IMGPage';

class FinancingIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Input
          size="huge"
          style={{
            position: 'absolute',
            top: '264px',
            left: '382px',
            width: '574px',
            height: '50px',
          }}
        />
        <Input
          size="huge"
          style={{
            position: 'absolute',
            top: '380px',
            left: '382px',
            width: '287px',
            height: '50px',
          }}
        />
        <Input
          size="huge"
          style={{
            position: 'absolute',
            left: '667px',
            top: '380px',
            width: '288px',
            height: '50px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '510px',
            left: '350px',
            width: '600px',
            height: '70px',
            backgroundColor: '#ebebeb',
          }}
        />
        <Input
          size="huge"
          style={{
            position: 'absolute',
            top: '510px',
            left: '382px',
            width: '574px',
            height: '50px',
          }}
        />
        <Link
          to="/financing-loading-img"
          style={{
            position: 'absolute',
            width: '221px',
            height: '58px',
            top: '599px',
            left: '559px',
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

export default FinancingIMGPage;
