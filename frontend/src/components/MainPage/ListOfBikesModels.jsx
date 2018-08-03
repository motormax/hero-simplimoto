import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Card, Button } from 'semantic-ui-react';


import availableMotorcycles from '../motorcycles/availableMotorcycles';

class ListOfBikesModels extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    const bikesModels = Object.values(availableMotorcycles).map(bikeData => (
      <Card className="image-card">
        <Card.Content className="btn-displaced-container">
          <img src={bikeData.defaultImageUrl} />
          <h2 className="txt-center">{bikeData.displayName}</h2>
          <Button size="large" primary className="btn-displaced" onClick={() => this.props.pickBike(bikeData.id)}>Comprar</Button>
        </Card.Content>
      </Card>
    ));

    return (
      <div className="txt-center">
        <h3 className="fs-huge txt-dark-gray">{t('bikes_models_title')}</h3>
        {bikesModels}
      </div>
    );
  }
}

export default translate('index') (ListOfBikesModels);
