import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Youtube from 'react-youtube';
import { isMobileOnly } from 'react-device-detect';

import { Icon, Button } from 'semantic-ui-react';
import availableMotorcycles from './motorcycles/availableMotorcycles';

class LiveTourPage extends Component {
  static propTypes = {
    bike: propTypes.shape({
      videoId: propTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { bike } = this.props;

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Tour en vivo</h2>
        <p className="fs-huge txt-med-gray txt-center">Próximamente podrás desde tu casa visitar el showroom y que te atienda en vivo un asesor especializado y te muestre todo lo que querés ver de la moto.</p>
        <div className="page-column-card txt-center">
          <Youtube
            videoId={bike.videoId}
            opts={{
              width: isMobileOnly ? 359 : 560,
              height: isMobileOnly ? 202 : 315,
              playerVars: { // https://developers.google.com/youtube/player_parameters
                color: 'white',
                rel: 0,
                loop: 0,
                autoplay: 1,
              },
            }}
          />
          <p className="margin-bottom">
            <a href="https://www.youtube.com/channel/UCnmBs4MJXsTbaQbFeNHViYg" target="_blanck">Mirá mas videos de <strong>Hero Argentina</strong> en nuestro canal de Youtube <Icon name="youtube" /></a>
          </p>
          <Link to="/dashboard">
            <Button size="large" className="btn-outline" secondary>
              <Icon name="chevron left" /> Volver
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  hasPickedBike: !!state.main.lead,
  bike: availableMotorcycles[ownProps.match.params.bikeName.toUpperCase().replace(/ /g, '_')],
});

export default connect(mapStateToProps)(LiveTourPage);
