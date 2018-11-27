import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Card, Image, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

export const moneyFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

class CarrouselItem extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    bikeImageUrl: propTypes.string.isRequired,
    bikeName: propTypes.string.isRequired,
    bikeMonthlyPrice: propTypes.number.isRequired,
    onBuy: propTypes.func.isRequired,
    allAccessories: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      logoUrl: propTypes.string.isRequired,
    })).isRequired,
  };

  showAccessories() {
    if (this.props.allAccessories) {
      return (
        <React.Fragment>
          <div className="bike-accessory">
            <Image src={this.props.allAccessories[0].logoUrl} />
            <p>{this.props.allAccessories[0].name}</p>
          </div>
          <div className="bike-accessory">
            <Image src={this.props.allAccessories[1].logoUrl} />
            <p>{this.props.allAccessories[1].name}</p>
          </div>
          <div className="bike-accessory">
            <Image src={this.props.allAccessories[2].logoUrl} />
            <p>{this.props.allAccessories[2].name}</p>
          </div>
        </React.Fragment>);
    }
    return <div>CARGANDO</div>;
  }

  render() {
    const {
      bikeImageUrl, bikeName, bikeMonthlyPrice, onBuy, t,
    } = this.props;

    return (
      <Card className="carrousel-item">
        <Image className="bike-image" src={bikeImageUrl} />
        <h3 className="bike-name">{bikeName}</h3>
        <div className="bike-accessories">
          {this.showAccessories()}
        </div>
        <Card.Content>
          <Divider />
          <p className="price">Desde {t('currency_sign')}<span className="price-number">{moneyFormatter.format(bikeMonthlyPrice)}</span> </p>
          <Button size="big" primary onClick={() => { window.location = 'http://www.heromotos.com.ar/contactenos'; }}>
            {t('ask')}
          </Button>
          <div style={{ height: 12 }} />
          <Button size="medium" primary onClick={() => { onBuy(bikeName); }}>{t('buy')}</Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  allAccessories: state.main.accessories.allAccessories,
});

export default translate('motorcycleCard')(connect(mapStateToProps, undefined)(CarrouselItem));
