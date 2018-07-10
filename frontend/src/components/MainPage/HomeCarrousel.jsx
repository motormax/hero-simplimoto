import React, { Component } from 'react';
import Slider from 'react-slick';

import ItemCarrousel from './ItemCarrousel';

import hankImgUrl from './images/Hunk.png';
import ignitorImgUrl from './images/Ignitor-blue.png';

class HomeCarrousel extends Component {
  render() {
    const settings =  {
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
            <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={hankImgUrl} bikeName="Hunk" onBuy={() => this.props.pickBike()} />
          </div>
          <div>
            <ItemCarrousel bikeImageUrl={ignitorImgUrl} bikeName="Ignitor" onBuy={() => this.props.pickBike()} />
          </div>
        </Slider>
      </div>
    );
  }
}

export default HomeCarrousel;
