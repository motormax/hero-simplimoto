import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Checkbox, Grid, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { toggleAccessorySelection } from '../../../actions/beginning';
import availableAccessories from '../../motorcycles/availableAccessories';
import { moneyFormatter } from '../CheckoutSummary';


class AccessoriesSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    totalPrice: propTypes.number.isRequired,
    selectedAccessories: propTypes.objectOf(propTypes.bool).isRequired,
    toggleAccessoryStatus: propTypes.func.isRequired,
  };

  render() {
    const {
      t, totalPrice, selectedAccessories, toggleAccessoryStatus,
    } = this.props;

    const dashboardCardItems = Object.keys(availableAccessories)
      .map((name) => {
        const { price, imgUrl } = availableAccessories[name];
        const isSelected = selectedAccessories[name];
        return (
          <div key={name} className="dashboard-card_items">
            <Checkbox defaultChecked={isSelected} onChange={() => toggleAccessoryStatus(name)} />
            <img src={imgUrl} alt={t(name)} />
            <div className="accessory_item_details">
              <p className="fw-bold txt-med-gray">{t(name)}</p>
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

const mapStateToProps = store => ({
  totalPrice: store.main.accessories.totalPrice,
  selectedAccessories: store.main.accessories.selectedAccessories,
});

const mapDispatchToProps = dispatch => ({
  toggleAccessoryStatus: accesoryName => dispatch(toggleAccessorySelection(accesoryName)),
});

export default translate('accessories_section')(connect(mapStateToProps, mapDispatchToProps)(AccessoriesSection));
