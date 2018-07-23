import React, { Component } from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';

import CarrouselItem from './CarrouselItem';

import hankImgUrl from './images/Hunk.png';
import ignitorImgUrl from './images/Ignitor-blue.png';

class HomeCarrousel extends Component {
  static propTypes = {
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const settings = {
      className: 'pepe',
      centerMode: false,
      infinite: true,
      slidesToShow: 4,
      speed: 500,
    };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <CarrouselItem bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike(1)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike(2)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike(1)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike(1)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike(2)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike(1)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike(2)} />
          </div>
          <div>
            <CarrouselItem bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike(1)} />
          </div>
        </Slider>
      </div>
    );
  }
}

export default HomeCarrousel;
