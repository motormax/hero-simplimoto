import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Image, Divider, List, Icon } from 'semantic-ui-react';

import glovesImgUrl from './images/Guantes.png';
import helmetImgUrl from './images/Casco.png';
import trunkImgUrl from './images/Baul.png';

class CarrouselItem extends Component {
  static propTypes = {
    bikeImageUrl: propTypes.string.isRequired,
    bikeName: propTypes.string.isRequired,
    onBuy: propTypes.func.isRequired,
  }

  render() {
    const { bikeImageUrl, bikeName, onBuy } = this.props;

    return (
      <Card className="carrousel-item">
        <Image className="bike-image" src={bikeImageUrl} />
        <h3 className="bike-name">{bikeName}</h3>
        <div className="bike-accessories">
          <div className="bike-accessory">
            <Image src={glovesImgUrl} />
            <p>Gloves</p>
          </div>
          <div className="bike-accessory">
            <Image src={helmetImgUrl} />
            <p>Helmet</p>
          </div>
          <div className="bike-accessory">
            <Image src={trunkImgUrl} />
            <p>Trunks</p>
          </div>
        </div>
        <Card.Content>
          <Divider />
          <p className="price">AR$<span className="price-number">10.000</span>/ month </p>
          <Button size="big" primary onClick={() => { onBuy(bikeName); }}>Comprar</Button>
        </Card.Content>
        <List className="bottom-links" horizontal link>
          <List.Item as='a'>
            <Icon disabled name='play circle' />
            Tour en vivo
          </List.Item>
          <List.Item as='a'>
            <Icon disabled name='heart' />
            Arreglar una cita
          </List.Item>
        </List>
      </Card>
    );
  }
}

export default CarrouselItem;
