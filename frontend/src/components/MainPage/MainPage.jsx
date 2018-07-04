import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Card, Image, Divider } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { changeBikeModel } from '../../actions/beginning';

import brandImgUrl from './images/marca-hero.png';
import hankImgUrl from './images/Hunk.png';
import ignitorImgUrl from './images/Ignitor-blue.png';

import glovesImgUrl from './images/Guantes.png';
import helmetImgUrl from './images/Casco.png';
import trunkImgUrl from './images/Baul.png';


class MainPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div className="home">
        <h1 className="home-title">By the bike you want <br/> <span className="emphasis">100% online</span></h1>

        <div className="cards-content">

          <Card className='carrousel-item'>
            <Image  className='brand-image' src={brandImgUrl} />
            <Image  className='bike-image' src={hankImgUrl} />
            <h3 className="bike-name">Hunk</h3>
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
              <Button size="big" primary onClick={() => { this.props.pickBike('HUNK'); }}>{t('Buy')}</Button>
            </Card.Content>
          </Card>

          <Card className='carrousel-item'>
            <Image  className='brand-image' src={brandImgUrl} />
            <Image  className='bike-image' src={ignitorImgUrl} />
            <h3 className="bike-name">Ignitor</h3>
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
              <Button size="big" primary onClick={() => { this.props.pickBike('HUNK'); }}>{t('Buy')}</Button>
            </Card.Content>
          </Card>

          <Card className='carrousel-item'>
            <Image  className='brand-image' src={brandImgUrl} />
            <Image  className='bike-image' src={hankImgUrl} />
            <h3 className="bike-name">Hunk</h3>
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
              <Button size="big" primary onClick={() => { this.props.pickBike('HUNK'); }}>{t('Buy')}</Button>
            </Card.Content>
          </Card>

        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: (bikeModel) => {
    dispatch(changeBikeModel(bikeModel));
    dispatch(push('/dashboard'));
  },
});

export default translate('index')(connect(undefined, mapDispatchToProps)(MainPage));
