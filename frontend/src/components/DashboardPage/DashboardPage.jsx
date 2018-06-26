import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Card, Header, Sticky } from 'semantic-ui-react';

import CheckoutSummary from './CheckoutSummary';
import FundingSection from './Sections/FinancingSection';

class DashboardPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    stages: propTypes.shape({
      isDefault: propTypes.bool,
    }).isRequired,
  };

  render() {
    const { stages, t } = this.props;

    return (
      <React.Fragment>
        <Header size="large">{t('dashboard')}</Header>
        <div ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column floated="left" style={{ textAlign: 'left' }} width={10}>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection financing={stages.funding} />
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

const mapStateToProps = store => ({ stages: store.main.stages });

export default translate('dashboard')(connect(mapStateToProps)(DashboardPage));
