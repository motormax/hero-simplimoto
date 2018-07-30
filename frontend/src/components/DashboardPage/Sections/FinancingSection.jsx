import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';


class FinancingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    // saveFinancing: propTypes.func.isRequired,
  }

  render() {
    const { t } = this.props;

    const isOk = true;
    const color = isOk ? 'red' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color={color} name="arrow right" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">{t(financing)}</h3>
              <p className="txt-med-gray fs-medium">Elegí el financiamiento más conveniente
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button fluid primary>Seleccionar Financiamiento</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('financing')(FinancingSection);
