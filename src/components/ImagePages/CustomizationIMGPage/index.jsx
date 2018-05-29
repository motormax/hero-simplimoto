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
            left: 21,
            top: 239,
            width: 640,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('blue')}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 732,
            top: 605,
            width: 126,
            height: 36,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('red')}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 941,
            top: 605,
            width: 126,
            height: 36,
          }}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => this.setColor('black')}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 1150,
            top: 605,
            width: 126,
            height: 36,
          }}
        />
        <Link
          to="dashboard-img"
          tabIndex={0}
          style={{
            position: 'absolute',
            left: 891,
            top: 713,
            width: 420,
            height: 61,
          }}
        />
      </IMGPage>
    );
  }
}

export default CustomizationIMGPage;
