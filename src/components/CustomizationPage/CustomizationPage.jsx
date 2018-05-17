import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';


class CustomizationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mirrorOption: 1,
      seatOption: 1,
      color: 'red',
    };
  }
  render() {
    return (
      <div >
        <h1>Personalización</h1>
        <div className="ui equal width celled grid">
          <div className="row">
            <div className="column">
              <div className="ui two column grid">
                <div className="right aligned twelve wide column">
                  <h2 style={{ fontSize: '40px' }}>Personalizá tu moto</h2>
                </div>
                <div className="right floated four wide column">
                  <button className="ui button">Pantalla completa</button>
                </div>
              </div>
              <img
                alt="Bike"
                style={{ width: '640px' }}
                src="https://auto.ndtvimg.com/bike-images/big/hero/passion-pro/hero-passion-pro.jpg"
              />
            </div>
            <div className="column">
              <div className="ui three column celled grid">
                <div className="column">
                  <h3>Espejos</h3>
                  <img
                    alt="Mirror"
                    style={{ width: '113px' }}
                    src="http://www.triumphdirect.co.uk/ekmps/shops/122f9c/images/oval-style-mirror-drilled-stem-2180-p.jpg"
                  />
                </div>
                <div className="column">
                  <h3>Asiento</h3>
                  <img
                    alt="Mirror"
                    style={{ width: '113px' }}
                    src="https://3.imimg.com/data3/RO/IU/MY-15304011/motorbike-seat-500x500.png"
                  />
                </div>
                <div className="column">
                  <h3>Color</h3>
                  <img
                    alt="Color"
                    style={{ width: '113px' }}
                    src="https://www.colorcombos.com/images/colors/FF0000.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({ stages: store.main.stages });

export default translate('translations')(connect(mapStateToProps)(CustomizationPage));
