import React, { Component } from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';

import CarrouselItem from './CarrouselItem';
import availableMotorcycles from '../motorcycles/availableMotorcycles';

class HomeCarrousel extends Component {
  static propTypes = {
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      slidesToShow: 3,
      speed: 500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            infinite: true,
          },
        },
      ],
    };

    const carrouselItems = Object.values(availableMotorcycles).map(bikeData => (
      <div>
        <CarrouselItem
          bikeImageUrl={bikeData.imageUrl}
          bikeName={bikeData.displayName}
          onBuy={() => this.props.pickBike(bikeData.id)}
        />
      </div>
    ));

    return (
      <div>
        <Slider {...settings}>
          {carrouselItems}
        </Slider>
      </div>
    );
  }
}

export default HomeCarrousel;
