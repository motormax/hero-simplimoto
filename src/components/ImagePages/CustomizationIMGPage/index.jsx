/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IMGPage from '../IMGPage';
import blueBikePage from './img/customization_blue.png';
import redBikePage from './img/customization_red.png';
import blackBikePage from './img/customization_black.png';

import blueBikeImage from './img/ignitor-sideface--blue.jpg';
import redBikeImage from './img/ignitor-sideface--red.jpg';
import blackBikeImage from './img/ignitor-sideface--black.jpg';

class CustomizationIMGPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedColor: 'blue',
    };
  }

  get pageImage() {
    switch (this.state.pickedColor) {
      case 'blue':
        return blueBikePage;
      case 'red':
        return redBikePage;
      case 'black':
        return blackBikePage;
      default:
        throw new Error(`Got unknown color: ${this.state.pickedColor}`);
    }
  }

  get bikeImage() {
    switch (this.state.pickedColor) {
      case 'blue':
        return blueBikeImage;
      case 'red':
        return redBikeImage;
      case 'black':
        return blackBikeImage;
      default:
        throw new Error(`Got unknown color: ${this.state.pickedColor}`);
    }
  }

  setColor = (pickedColor) => {
    this.setState({ pickedColor });
  };

  render() {
    return (
      <IMGPage imgUrl={this.pageImage} >
        <img
          alt="bike"
          src={this.bikeImage}
          style={{
            position: 'absolute',
            width: 640,
            left: 0,
            height: 399,
            top: 220,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('blue')}
          style={{
            cursor: 'pointer',
            position: 'absolute',

            width: 118.86,
            left: 701.24,
            height: 31.81,
            top: 586,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('red')}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            width: 118.86,
            left: 901.24,
            height: 31.81,
            top: 586,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('black')}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            width: 118.86,
            left: 1101.41,
            height: 31.81,
            top: 586,
          }}
        />
        <Link
          to="dashboard4-img"
          tabIndex={0}
          style={{
            position: 'absolute',
            width: 398,
            left: 854,
            height: 55.93,
            top: 682.98,
          }}
        />
        <Link // cancel and go back to dashboard
          to="/dashboard3-img"
          style={{
            position: 'absolute',
            width: '328px',
            height: '42px',
            left: '32px',
            top: '20px',
          }}
        />
      </IMGPage>
    );
  }
}

export default CustomizationIMGPage;
