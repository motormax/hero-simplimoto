/* eslint react/no-danger: 0 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Checkbox, Grid, Icon, Segment, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import humps from 'humps';

import {
  allAccessoriesFetched,
  startedFetchingAllAccessories,
  chosenAccessoriesFetched,
  startedFetchingChosenAccessories,
  addAccessoryToChosens,
  deleteAccessoryFromChosens,
} from '../../../actions/accessories';
import { moneyFormatter } from '../CheckoutSummary';


class AccessoriesSection extends Component {
  static defaultProps = {
    isLoading: false,
    chosenAccessories: [],
  }
  static propTypes = {
    fetchAllAccessories: propTypes.func.isRequired,
    fetchChosenAccessories: propTypes.func.isRequired,
    toggleAccessoryStatus: propTypes.func.isRequired,
    t: propTypes.func.isRequired,
    totalPrice: propTypes.number.isRequired,
    accessories: propTypes.shape({
      hasFetchedAllAccessories: propTypes.bool.isRequired,
      hasFetchedChosenAccessories: propTypes.bool.isRequired,
    }).isRequired,
    allAccessories: propTypes.arrayOf({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      description: propTypes.string.isRequired,
      logoUrl: propTypes.string.isRequired,
    }).isRequired,
    chosenAccessories: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      logoUrl: propTypes.string.isRequired,
    })),
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    isLoading: propTypes.bool,
  };

  componentDidMount() {
    if (!this.props.accessories.hasFetchedAllAccessories) {
      this.props.fetchAllAccessories();
    }
    if (!this.props.accessories.hasFetchedChosenAccessories) {
      this.props.fetchChosenAccessories(this.props.lead.id);
    }
  }

  isAccessoryChosen = accessory =>
    this.props.chosenAccessories.some(chosenAccessory => chosenAccessory.id === accessory.id);

  dangerousHTMLQuoteDetails = content =>
    <div dangerouslySetInnerHTML={{ __html: content }} />

  render() {
    const {
      t, totalPrice, toggleAccessoryStatus,
      isLoading, allAccessories,
    } = this.props;

    if (isLoading) {
      return <div>Cargando</div>;
    }

    const dashboardCardItems = allAccessories
      .map((accessory) => {
        const {
          name,
          description,
          price,
          logoUrl,
          id,
        } = accessory;
        const isSelected = this.isAccessoryChosen(accessory);
        return (
          <div key={name} className="dashboard-card_items">
            <Checkbox
              checked={isSelected}
              onChange={() => toggleAccessoryStatus(id, !isSelected, this.props.lead.id)}
            />
            <img
              src={logoUrl}
              alt={accessory.name}
              width="60px"
              height="60px"
            />
            <div className="accessory_item_details">
              <p className="fw-bold txt-med-gray">
                {name} &nbsp;
                <Popup trigger={<Icon name="info circle" />}>
                  <Popup.Content>{this.dangerousHTMLQuoteDetails(description)}</Popup.Content>
                </Popup>
              </p>
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
  accessories: state.main.accessories,
  allAccessories: state.main.accessories.allAccessories,
  chosenAccessories: state.main.accessories.chosenAccessories,
  isLoading: state.main.accessories.isLoading,
});

const mapDispatchToProps = dispatch => ({
  toggleAccessoryStatus: async (accessoryId, isSelected, leadId) => {
    let response;

    if (isSelected) {
      response = await axios.post(`/api/leads/${leadId}/accessory/${accessoryId}`);
      dispatch(addAccessoryToChosens(accessoryId));
    } else {
      response = await axios.delete(`/api/leads/${leadId}/accessory/${accessoryId}`);
      dispatch(deleteAccessoryFromChosens(accessoryId));
    }
    console.log(response); // eslint-disable-line no-console
  },
  fetchAllAccessories: async () => {
    dispatch(startedFetchingAllAccessories());
    const { data: { data: allAccessories } } = await axios.get('/api/accessories');
    dispatch(allAccessoriesFetched(humps.camelizeKeys(allAccessories)));
  },
  fetchChosenAccessories: async (leadId) => {
    dispatch(startedFetchingChosenAccessories());
    const { data: { data: chosenAccessories } } = await axios.get(`/api/leads/${leadId}/accessories`);
    dispatch(chosenAccessoriesFetched(humps.camelizeKeys(chosenAccessories)));
  },
});

export default translate('accessories_section')(connect(mapStateToProps, mapDispatchToProps)(AccessoriesSection));
