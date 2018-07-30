import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Card, Image, Divider, List, Icon } from 'semantic-ui-react';

import glovesImgUrl from './../images/Guantes.png';
import helmetImgUrl from './../images/Casco.png';
import trunkImgUrl from './../images/Baul.png';

class CarrouselItem extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    bikeImageUrl: propTypes.string.isRequired,
    bikeName: propTypes.string.isRequired,
    onBuy: propTypes.func.isRequired,
  };

  render() {
    const {
      bikeImageUrl, bikeName, onBuy, t,
    } = this.props;

    return (
      <Card className="carrousel-item">
        <Image className="bike-image" src={bikeImageUrl} />
        <h3 className="bike-name">{bikeName}</h3>
        <div className="bike-accessories">
          <div className="bike-accessory">
            <Image src={glovesImgUrl} />
            <p>{t('gloves')}</p>
          </div>
          <div className="bike-accessory">
            <Image src={helmetImgUrl} />
            <p>{t('helmet')}</p>
          </div>
          <div className="bike-accessory">
            <Image src={trunkImgUrl} />
            <p>{t('trunks')}</p>
          </div>
        </div>
        <Card.Content>
          <Divider />
          <p className="price">{t('currency_sign')}<span className="price-number">10.000</span>/ {t('month')} </p>
          <Button size="big" primary onClick={() => { onBuy(bikeName); }}>{t('buy')}</Button>
        </Card.Content>
        <List className="bottom-links" horizontal link>
          <List.Item as="a">
            <Icon disabled name="play circle" />
            {t('live_tour')}
          </List.Item>
          <List.Item as="a">
            <Icon disabled name="heart" />
            {t('appointment')}
          </List.Item>
        </List>
      </Card>
    );
  }
}

export default translate('motorcycleCard')(CarrouselItem);
