import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Youtube from 'react-youtube';

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
        <p className="fs-huge txt-med-gray txt-center">Próximamente podrás realizar un tour en vivo por nuestros concesionario, <br /> mientras tanto disfrutá del siguiente video:</p>
        <div className="page-column-card txt-center">
          <Youtube
            videoId={bike.videoId}
            opts={{
              width: 560,
              height: 315,
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
