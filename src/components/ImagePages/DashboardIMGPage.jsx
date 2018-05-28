import React from 'react';

import imageUrl from './Dashboard01@2x.png';
import IMGPage from './IMGPage';

class Dashboard01IMGPage extends IMGPage {
  render() {
    return this.renderImg(
      imageUrl,
      <span>
          <a
            style={{
              position: 'absolute',
              width: '145.83px',
              height: '31.81px',
              top: '602px',
              left: '618px',
            }}
            href="customization"
          />
      </span>,
    );
  }
}

export default Dashboard01IMGPage;
