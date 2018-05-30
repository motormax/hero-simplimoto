import React, { Component } from 'react';
import IMGPage from './IMGPage';
import imageUrl from './img/Success.png';

class SuccessIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl} />
    );
  }
}

export default SuccessIMGPage;
