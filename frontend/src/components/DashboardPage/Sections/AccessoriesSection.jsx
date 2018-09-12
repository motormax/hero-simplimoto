import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Checkbox, Grid, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import humps from 'humps';

import {
  allAndChosenAccessoriesFetched,
  startedFetchingAllAndChosenAccessories,
  toggleAccessorySelection,
} from '../../../actions/accessories';
import { moneyFormatter } from '../CheckoutSummary';


class AccessoriesSection extends Component {
  static defaultProps = {
    isLoading: false,
  }
  static propTypes = {
    fetchAccessories: propTypes.func.isRequired,
    toggleAccessoryStatus: propTypes.func.isRequired,
    t: propTypes.func.isRequired,
    totalPrice: propTypes.number.isRequired,
    selectedAccessories: propTypes.objectOf(propTypes.bool).isRequired,
    allAccessories: propTypes.arrayOf({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      description: propTypes.string.isRequired,
      logoUrl: propTypes.string.isRequired,
    }).isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    isLoading: propTypes.bool,
  };

  componentDidMount() {
    // POLEMICO: ¿podrian no haber accessorios en la base?
    if (this.props.allAccessories.length === 0) {
      this.props.fetchAccessories(this.props.lead.id);
    }
  }

  render() {
    const {
      t, totalPrice, selectedAccessories, toggleAccessoryStatus,
      isLoading, allAccessories,
    } = this.props;

    if (isLoading) {
      return <div>Cargando</div>;
    }

    const dashboardCardItems = allAccessories
      .map((accessory) => {
        const { name, price, logoUrl, id } = accessory;
        const isSelected = selectedAccessories[accessory.name];
        return (
          <div key={name} className="dashboard-card_items">
            <Checkbox defaultChecked={isSelected} onChange={() => toggleAccessoryStatus(id, name, !isSelected, this.props.lead.id)} />
            <img
              src={logoUrl}
              alt={accessory.name}
              width="60px"
              height="60px"
            />
            <div className="accessory_item_details">
              <p className="fw-bold txt-med-gray">{name}</p>
              <p className="txt-med-gray">{t('currency_sign')}
                <span className="fw-bold">{moneyFormatter.format(price)}</span>
              </p>
            </div>
          </div>);
      });

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: '#67CC4F' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" className="txt-green" name="check" />
            </Grid.Column>
            <Grid.Column width={15}>
              <h3 className="fw-bold fs-big">{t('accessories')}
                <span className="fs-medium txt-dark-gray">
                  <span className="fw-normal"> {t('currency_sign')}</span>{moneyFormatter.format(totalPrice)}
                </span>
              </h3>
              <div className="dashboard-card_items-container">
                {dashboardCardItems}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.main.lead,
  totalPrice: state.main.accessories.totalPrice,
  selectedAccessories: state.main.accessories.selectedAccessories,
  allAccessories: state.main.accessories.allAccessories,
  isLoading: state.main.accessories.isLoading,
});

const mapDispatchToProps = dispatch => ({
  toggleAccessoryStatus: async (accessoryId, accesoryName, isSelected, leadId) => {
    dispatch(toggleAccessorySelection(accesoryName));

    if (isSelected) {
      const response = await axios.post(`/api/leads/${leadId}/accessory/${accessoryId}`);
      console.log(response); // eslint-disable-line no-console
    } else {
      const response = await axios.delete(`/api/leads/${leadId}/accessory/${accessoryId}`);
      console.log(response); // eslint-disable-line no-console
    }
  },
  fetchAccessories: async (leadId) => {
    dispatch(startedFetchingAllAndChosenAccessories());
    const { data: { data: allAccessories } } = await axios.get('/api/accessories');
    const { data: { data: chosenAccessories } } = await axios.get(`/api/leads/${leadId}/accessories`);
    dispatch(allAndChosenAccessoriesFetched(
      humps.camelizeKeys(allAccessories),
      humps.camelizeKeys(chosenAccessories),
    ));
  },
});

export default translate('accessories_section')(connect(mapStateToProps, mapDispatchToProps)(AccessoriesSection));
