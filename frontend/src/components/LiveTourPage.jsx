import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react'

const moto = "Hunk Sport";
const fromHome = true;

class LiveTourPage extends Component {

  render(){
      const videoUrl =
      moto === "Hunk Sport" ? "https://www.youtube.com/embed/xJ9Rfd9q_qc"
      : moto === "Hunk" ? "https://www.youtube.com/embed/ksVob1Jc0E0"
      : moto === "Ignitor" ? "https://www.youtube.com/embed/xFCnbwFHn7E"
      : "https://www.youtube.com/embed/E7Quvpn_EIw";

    return (
      <div>
        {fromHome ?
          <Button
            className="btn-sticky"
            size="massive"
            primary
          >
            Comprar una {moto}
          </Button> : null}
        <h2 className="fs-massive fw-bold txt-center">Tour en vivo</h2>
        <p className="fs-huge txt-med-gray txt-center">Próximamente podrás realizar un tour en vivo por nuestros concesionario, <br/> mientras tanto disfrutá del siguiente video:</p>
        <div className="page-column-card txt-center">
          <iframe width="560" height="315" src={videoUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <p className="margin-bottom">
            <a href="https://www.youtube.com/channel/UCnmBs4MJXsTbaQbFeNHViYg" target="_blanck">Mirá mas videos de <strong>Hero Argentina</strong> en nuestro canal de Youtube <Icon name="youtube"/></a>
          </p>
          <Button size="large" className="btn-outline" secondary>
            <Icon name="chevron left"/> Volver
          </Button>
        </div>
      </div>
    );
  }
}

export default LiveTourPage;
