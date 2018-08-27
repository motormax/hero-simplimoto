import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Card } from 'semantic-ui-react';


import availableMotorcycles from '../motorcycles/availableMotorcycles';

class ListOfBikesModels extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    goToSpec: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    const bikesModels = Object.values(availableMotorcycles).map(bikeData => (
      <Card key={bikeData.displayName} className="image-card" onClick={() => this.props.goToSpec(bikeData.displayName)} link>
        <Card.Content>
          <img src={bikeData.defaultImageUrl} alt={bikeData.displayName} />
          <h2 className="txt-center txt-med-gray">{bikeData.displayName}</h2>
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

export default translate('index')(ListOfBikesModels);
