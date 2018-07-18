import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Segment, Header } from 'semantic-ui-react';

import CheckoutSummary from './CheckoutSummary';
import FundingSection from './Sections/FinancingSection';
import DeliverySegment from './Sections/DeliverySegment';
import BikeModelSection from './Sections/BikeModelSection';

class DashboardPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    funding: propTypes.shape({
      isDefault: propTypes.bool,
    }).isRequired,
  };

  render() {
    const { funding, user, t } = this.props;
    if (user.isLoading) {
      return <h1>CARGANDO</h1>;
    }

    return (
      <React.Fragment>
        <div className="dashboard" ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column width={10}>
              <Header size="large">{t('dashboard')} ({user.id})</Header>
              <Segment.Group>
                <BikeModelSection motorcycle={user.motorcycle}/>
                <FundingSection financing={funding} />
                <DeliverySegment changeToDelivery={() => alert('ir a delivery page')} /> /* do the link work */
              </Segment.Group>
            </Grid.Column>
            <Grid.Column width={6}>
              <div context={this.ref}>
                <CheckoutSummary />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  funding: store.main.funding,
  user: store.main.user,
});

export default translate('dashboard')(connect(mapStateToProps)(DashboardPage));
