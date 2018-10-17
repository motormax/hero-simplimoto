import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
class MobilePage extends Component {

  render() {

    return (
      <div>
        <h2 className="fs-huge fw-bold txt-center">Próximamente disponible en iPhone <Icon className="apple" /> y Android <Icon className="android" /></h2>
        <h2 className="fs-big fw-bold txt-center">Mientras tanto podes visitar nuestro sitio en Tablet <Icon className="tablet alternate" /> o PC <Icon className="computer" /></h2>
      </div>
    );
  }
}

export default MobilePage;
