import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import humps from 'humps';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { parse } from 'query-string';
import { leadFetched } from '../../actions/beginning';
import availableMotorcycles from '../motorcycles/availableMotorcycles';

import {
  allAccessoriesFetched,
  startedFetchingAllAccessories,
} from '../../actions/accessories';
import HomeCarrousel from './HomeCarrousel';
import ListOfBikesModels from './ListOfBikesModels';


class MainPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    fetchAllAccessories: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
    goToSpec: propTypes.func.isRequired,
    accessories: propTypes.shape({
      hasFetchedAllAccessories: propTypes.bool.isRequired,
      hasFetchedChosenAccessories: propTypes.bool.isRequired,
    }).isRequired,
    isLoading: propTypes.bool,
    location: propTypes.string.isRequired,
  };

  componentDidMount() {
    if (!this.props.accessories.hasFetchedAllAccessories) {
      this.props.fetchAllAccessories();
    }
    const query = parse(this.props.location.search);
    if (query.buyMoto && availableMotorcycles[query.buyMoto]) {
      this.props.pickBike(availableMotorcycles[query.buyMoto].id);
    }
  }

  render() {
    const { t, isLoading } = this.props;

    if (isLoading) {
      return <div>CARGANDO</div>;
    }

    return (
      <div>
        <h1 className="home-title">{t('buy_the_bike')} <br /> <span className="emphasis">{t('online')}</span></h1>
        <HomeCarrousel pickBike={this.props.pickBike} />
        <ListOfBikesModels goToSpec={this.props.goToSpec} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessories: state.main.accessories,
  isLoading: state.main.accessories.isLoading,
  allAccessories: state.main.accessories.allAccessories,
});

const mapDispatchToProps = dispatch => ({
  pickBike: async (motorcycleId) => {
    const { data: { data: lead } } = await axios.post('/api/leads/', { lead: { motorcycle_id: motorcycleId } });

    dispatch(leadFetched(lead));
    dispatch(push('/dashboard'));
  },
  goToSpec: (bikeName) => {
    dispatch(push(`/specs/${bikeName}`));
  },
  fetchAllAccessories: async () => {
    dispatch(startedFetchingAllAccessories());
    const { data: { data: allAccessories } } = await axios.get('/api/accessories');
    dispatch(allAccessoriesFetched(humps.camelizeKeys(allAccessories)));
  },
});

export default translate('index')(connect(mapStateToProps, mapDispatchToProps)(MainPage));
