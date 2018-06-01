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
            width: 544,
            left: 368,
            height: 48,
            top: 270,
            border: 'none',
            background: 'transparent',
          }}
        >
          <input style={{
            border: 'none',
            background: 'transparent',
          }}
          />
        </Input>
        <Input
          size="huge"
          style={{
            position: 'absolute',
            width: 215,
            left: 368,
            height: 48,
            top: 380,
            border: 'none',
            background: 'transparent',
          }}
        >
          <input style={{
            border: 'none',
            background: 'transparent',
          }}
          />
        </Input>
        <Input
          size="huge"
          style={{
            position: 'absolute',
            width: 324,
            left: 588,
            height: 48,
            top: 380,
            border: 'none',
            background: 'transparent',
          }}
        >
          <input style={{
            border: 'none',
            background: 'transparent',
          }}
          />
        </Input>
        <Input
          size="huge"
          style={{
            position: 'absolute',
            width: 505,
            left: 410,
            height: 45,
            top: 501,
            border: 'none',
            background: 'transparent',
          }}
        >
          <input style={{
            border: 'none',
            background: 'transparent',
          }}
          />
        </Input>
        <Link
          to="/financing-loading-img"
          style={{
            position: 'absolute',
            width: 352.58,
            height: 55.93,
            top: 597.98,
            left: 464,
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
