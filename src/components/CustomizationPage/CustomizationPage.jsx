import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { translate } from 'react-i18next';
import CustomizationPanel from './CustomizationPanel';


class CustomizationPage extends Component {
  static propTypes = {
    chosenMirror: propTypes.number.isRequired,
  };

  render() {
    return (
      <div>
        <h1>Personalización</h1>
        <div className="ui equal width celled grid">
          <div className="row">
            <div className="column">
              <div className="ui two column grid">
                <div className="right aligned twelve wide column">
                  <h2 style={{   fontSize: '40px' }}>Personalizá tu moto</h2>
                </div>
                <div className="right floated four wide column">
                  <Button>Pantalla completa</Button>
                </div>
              </div>
              <img
                alt="Bike"
                style={{ width: '640px' }}
                src="https://auto.ndtvimg.com/bike-images/big/hero/passion-pro/hero-passion-pro.jpg"
              />
            </div>
            <div className="column">
              <CustomizationPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps =
  store => ({ chosenMirror: store.main.stages.customization.chosenMirror });
const mapDispatchToProps = dispatch => ({
  changeMirror: optionNumber => dispatch({
    type: 'CHANGE_MIRROR',
    chosenOption: optionNumber,
  }),
});

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(CustomizationPage));
