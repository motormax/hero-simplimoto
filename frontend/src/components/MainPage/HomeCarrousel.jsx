import React, { Component } from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';


import CarrouselItem from './CarrouselItem';

import hunkImgUrl from './../images/Hunk.png';
import hunkSportImgUrl from './../images/Hunk-sport.png';
import ignitorImgUrl from './../images/ignitor.png';

const MOTORBIKE_LIST = [
  /*
  Until we implement dynamic motorbike selection, we use hardcoded IDs.
  Motorbike IDs can be found in backend/priv/repo/seeds.exs (they are 1-indexed).
  */
  {
    id: 1,
    displayName: 'Hunk',
    imageUrl: hunkImgUrl,
  },
  {
    id: 2,
    displayName: 'Ignitor',
    imageUrl: ignitorImgUrl,
  },
  {
    id: 3,
    displayName: 'Hunk Sport',
    imageUrl: hunkSportImgUrl,
  },
  {
    id: 4,
    displayName: 'Dash',
    imageUrl: hunkImgUrl,
  },
];

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

    const carrouselItems = MOTORBIKE_LIST.map(bikeData => (
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
