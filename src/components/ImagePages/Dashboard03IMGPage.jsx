import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import imageUrl from './img/Dashboard02@2x.png'; // design of 03 not yet ready
import IMGPage from './IMGPage';

// In this dashboard the reservation is/should be payed

class Dashboard03IMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <Link
          to="customization-img"
          style={{
            position: 'absolute',
            width: '136px',
            height: '37px',
            top: '631px',
            left: '649px',
          }}
        />
        <Header
          style={{
            position: 'absolute',
            width: '136px',
            height: '165px',
            top: '200px',
            left: '1000px',
            fontSize: 'xx-large',
            backgroundColor: 'red',
          }}
        >
          FALTA LA RESERVA ACÁ
        </Header>
      </IMGPage>
    );
  }
}
export default Dashboard03IMGPage;
