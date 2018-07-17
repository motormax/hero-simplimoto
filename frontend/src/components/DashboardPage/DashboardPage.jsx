import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Card, Header, Sticky } from 'semantic-ui-react';

import CheckoutSummary from './CheckoutSummary';
import FundingSection from './Sections/FinancingSection';
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
        <Header size="large">{t('dashboard')} ({user.id})</Header>
        <div ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column floated="left" style={{ textAlign: 'left' }} width={10}>
              <Card.Group>
                <BikeModelSection motorcycle={user.motorcycle} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Sticky context={this.ref}>
                <CheckoutSummary />
              </Sticky>
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
