import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { goBack, push } from 'react-router-redux';
import { Tab, Table, Segment, Button } from 'semantic-ui-react';
import Slider from 'react-slick';
import { leadFetched } from '../../actions/beginning';
import availableMotorcycles from '../motorcycles/availableMotorcycles';

class BikeSpecsPage extends Component {
  static propTypes = {
    bike: propTypes.shape().isRequired,
    hasPickedBike: propTypes.bool.isRequired,
    pickBike: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  };

  panes = () => this.props.bike.bikeInfo.map(pane => ({
    menuItem: pane.paneTitle,
    render: () => (
      <Tab.Pane>
        <Table basic="very">
          <Table.Body>
            {
              pane.paneItems.map(paneItem => (
                <Table.Row>
                  <Table.Cell><span className="fw-bold">{paneItem.itemTitle}</span></Table.Cell>
                  <Table.Cell>{paneItem.description}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Tab.Pane>
    ),
  }));

  sliderImages = () => this.props.bike.bikeImages.map(url => (
    <div>
      <img src={url} className="carrousel-default-images" alt="Foto de Ignitor" />
    </div>
  ));

  render() {
    const { hasPickedBike } = this.props;
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
    };

    return (
      <div className="page-column-card no-border">
        {!hasPickedBike ?
          <Button
            className="btn-sticky"
            size="massive"
            primary
            onClick={() => {
              this.props.pickBike(this.props.bike.id);
            }}
          >
            Comprar una {this.props.bike.displayName}
          </Button> : null}
        <h2 className="txt-center fs-massive">{this.props.bike.specsTitle}</h2>

        <p className="fs-huge txt-med-gray txt-center">Especificaciones técnicas</p>

        <Tab panes={this.panes()} />

        <Segment className="white-segment">
          <Slider className="margin-bottom" {...settings}>

            {this.sliderImages()}

          </Slider>
        </Segment>
        <div className="txt-center" attached="bottom">
          <Button size="large" onClick={() => this.props.goBack()}>Volver</Button>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: async (motorcycleId) => {
    const { data: { data: lead } } = await axios.post('/api/leads/', { lead: { motorcycle_id: motorcycleId } });

    dispatch(leadFetched(lead));
    dispatch(push('/dashboard'));
  },
  goBack: () => {
    dispatch(goBack());
  },
});

const mapStateToProps = (state, ownProps) => ({
  hasPickedBike: !!state.main.lead,
  bike: availableMotorcycles[ownProps.match.params.bikeName.toUpperCase()],
});

export default connect(mapStateToProps, mapDispatchToProps)(BikeSpecsPage);
