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
    t: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <h1 className="home-title">{t('buy_the_bike')} <br /> <span className="emphasis">{t('online')}</span></h1>
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
