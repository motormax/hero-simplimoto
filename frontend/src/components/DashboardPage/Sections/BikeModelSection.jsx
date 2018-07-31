import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';


import bikeUrl from './../../images/ignitor.png';

class BikeModelSection extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
    t: propTypes.func.isRequired,
  };

  render() {
    const { motorcycle, t } = this.props;

    return (
      <Segment className="dashboard-card motorcycle-resume" style={{ borderLeftColor: '#21ba45' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <img src={bikeUrl} alt={motorcycle.name} />
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="fw-bold fs-big">
                {motorcycle.name}
                <span className="fs-medium txt-dark-gray"><span className="fw-normal">{t('currency_sign')}</span>{motorcycle.price}</span>
              </h3>
              <ul className="txt-med-gray fs-medium italic">
                <li>Técnilogia I3S</li>
                <li>Técnilogia I3S</li>
                <li>Técnilogia I3S</li>
                <li>Técnilogia I3S</li>
                <li>Técnilogia I3S</li>
              </ul>

            </Grid.Column>
            <Grid.Column width={5}>
              <div className="resume-button-container">
                <Button fluid secondary> <Icon name="play circle" /> {t('live_tour')}</Button>
                <Button className="btn-outline" fluid secondary> <Icon name="eye" /> {t('moto_specs')}</Button>
                <Button className="btn-outline" fluid secondary> <Icon name="motorcycle" /> {t('change_model')}</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('bikeModelSection')(BikeModelSection);
