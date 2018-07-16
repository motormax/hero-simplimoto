import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Card, Header } from 'semantic-ui-react';

import CheckoutSummary from './CheckoutSummary';
import FundingSection from './Sections/FinancingSection';

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

    return (
      <React.Fragment>
        <div className="dashboard" ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column width={10}>
              <Header size="large">{t('dashboard')} ({user.id})</Header>
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
              <Card.Group>
                <FundingSection financing={funding} />
              </Card.Group>
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
