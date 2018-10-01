import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import availableMotorcycles from '../../motorcycles/availableMotorcycles';
import { moneyFormatter } from '../CheckoutSummary';


class BikeModelSection extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
    }).isRequired,
    imgUrl: propTypes.string.isRequired,
    t: propTypes.func.isRequired,
  };

  render() {
    const { motorcycle, imgUrl, t } = this.props;

    return (
      <Segment className="dashboard-card motorcycle-resume" style={{ borderLeftColor: '#21ba45' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <img src={imgUrl} alt={motorcycle.name} />
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 className="fw-bold fs-big">
                {availableMotorcycles[motorcycle.name].displayName}
                <span className="fs-medium txt-dark-gray">
                  <span className="fw-normal">$</span>
                  {moneyFormatter.format(motorcycle.price)}
                </span>
              </h3>
              <ul className="txt-med-gray fs-medium italic">
                {
                  availableMotorcycles[motorcycle.name].miniSpecs.map(bikeSpec => (
                    <li>{bikeSpec}</li>
                  ))
                }
              </ul>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className="resume-button-container">
                <Link to={`/tour/${motorcycle.name}`}>
                  <Button fluid secondary> <Icon name="play circle" /> {t('live_tour')}</Button>
                </Link>
                <Link to={`/specs/${motorcycle.name}`}>
                  <Button className="btn-outline" fluid secondary>
                    <Icon name="eye" />
                    {t('moto_specs')}
                  </Button>
                </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('bikeModelSection')(BikeModelSection);
