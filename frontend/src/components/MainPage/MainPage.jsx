import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { userFetched } from '../../actions/beginning';

import HomeCarrousel from './HomeCarrousel';


class MainPage extends Component {
  static propTypes = {
    pickBike: propTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h1 className="home-title">By the bike you want <br /> <span className="emphasis">100% online</span></h1>
        <HomeCarrousel pickBike={this.props.pickBike} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: async (motorcycleId) => {
    const { data: { data: user } } = await axios.post('/api/users/', { user: { motorcycle_id: motorcycleId } });

    dispatch(userFetched(user));
    dispatch(push('/dashboard'));
  },
});

export default translate('index')(connect(undefined, mapDispatchToProps)(MainPage));
