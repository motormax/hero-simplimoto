import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Segment, Header } from 'semantic-ui-react';

import CheckoutSummary from './CheckoutSummary';
import DateYourBikeSection from './Sections/DateYourBikeSection';
import FundingSection from './Sections/FinancingSection';
import DeliverySection from './Sections/DeliverySection';
import BikeModelSection from './Sections/BikeModelSection';
import BikeColorSection from './Sections/BikeColorSection';
import AccessoriesSection from './Sections/AccessoriesSection';
import availableColors from '../motorcycles/availableColors';

class DashboardPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    funding: propTypes.shape({
      isDefault: propTypes.bool,
    }).isRequired,
  };

  render() {
    const { funding, lead, t } = this.props;
    if (lead.isLoading) {
      return <h1>CARGANDO</h1>;
    }

    return (
      <React.Fragment>
        <div className="dashboard" ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column width={10}>
              <Header size="huge">{t('good_choice')} <span className="fs-tinny fw-normal txt-med-gray">{t('header_intro')}</span></Header>
              <Segment.Group>
                <BikeModelSection motorcycle={lead.motorcycle} />
                <FundingSection financing={funding} />
                <BikeColorSection availableColors={availableColors[lead.motorcycle.name]} />
                <AccessoriesSection />
                <DateYourBikeSection />
                <DeliverySection />
              </Segment.Group>
            </Grid.Column>
            <Grid.Column width={6}>
              <div>
                <CheckoutSummary motorcycle={lead.motorcycle} />
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
  lead: store.main.lead,
});

export default translate('dashboard')(connect(mapStateToProps)(DashboardPage));
