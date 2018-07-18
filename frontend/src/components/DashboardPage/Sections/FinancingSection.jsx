import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';


class FinancingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    financing: propTypes.shape({}).isRequired,
    // saveFinancing: propTypes.func.isRequired,
  }

  render() {
    const { t, financing } = this.props;

    const isOk = true;
    const icon = isOk ? 'check circle outline' : 'warning circle';
    const color = isOk ? 'darkgray' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color={color} name="arrow right" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">{t('title')}</h3>
              <p className="txt-med-gray fs-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc pulvinar tristique nisi et posuere
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className="btn-outline" fluid secondary>{t('change')}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('financing')(FinancingSection);
