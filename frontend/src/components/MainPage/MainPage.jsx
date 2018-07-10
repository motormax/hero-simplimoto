import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { userFetched } from '../../actions/beginning';

import ItemCarrousel from './ItemCarrousel';

import hankImgUrl from './images/Hunk.png';
import ignitorImgUrl from './images/Ignitor-blue.png';


class MainPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
  };

  render() {

    return (
      <div className="home">
        <h1 className="home-title">By the bike you want <br /> <span className="emphasis">100% online</span></h1>
        <div className="cards-content">
          <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={nombreDeLaMoto => this.props.pickBike()} />
          <ItemCarrousel bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike()} />
          <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike()} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: async () => {
    const { data: { data: user } } = await axios.post('/api/users/', {});

    dispatch(userFetched(user));
    dispatch(push('/dashboard'));
  },
});

export default translate('index')(connect(undefined, mapDispatchToProps)(MainPage));
