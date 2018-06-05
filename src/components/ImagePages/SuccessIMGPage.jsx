import React, { Component } from 'react';
import Youtube from 'react-youtube';
import IMGPage from './IMGPage';
import imageUrl from './img/Success.png';

class SuccessIMGPage extends Component {
  render() {
    return (
      <IMGPage imgUrl={imageUrl}>
        <div
          style={{
            position: 'absolute',
            left: 172,
            top: 196,
          }}
        >
          <Youtube
            videoId="UKb32gDSxV4"
            opts={{
              width: 936,
              height: 525,
              playerVars: { // https://developers.google.com/youtube/player_parameters
                color: 'white',
                rel: 0,
                loop: 0,
                autoplay: 1,
              },
            }}
          />
        </div>
      </IMGPage>
    );
  }
}

export default SuccessIMGPage;
