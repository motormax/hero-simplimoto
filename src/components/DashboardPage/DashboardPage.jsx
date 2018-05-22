import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Card, Header, Sticky } from 'semantic-ui-react';

import CurrentBill from './CurrentBill';
import FundingSection from './Sections/FundingSection';

class DashboardPage extends Component {
  static propTypes = {
    stages: propTypes.shape({
      isDefault: propTypes.bool,
    }).isRequired,
  }

  render() {
    const { stages } = this.props;

    return (
      <React.Fragment>
        <Header size="large">Dashboard</Header>
        <div ref={(ref) => { this.ref = ref; }}>
          <Grid>
            <Grid.Column floated="left" style={{ textAlign: 'left' }} width={10}>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
              <Card.Group>
                <FundingSection funding={stages.funding} />
              </Card.Group>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Sticky context={this.ref}>
                <CurrentBill />
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({ stages: store.main.stages });

export default translate('translations')(connect(mapStateToProps)(DashboardPage));
