import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Icon, Image, Segment, Radio } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { changeBikeColor } from '../../../actions/beginning';

import mirrow1 from '../../images/accessories/mirrow-1.png';
import mirrow2 from '../../images/accessories/mirrow-2.png';
import mirrow4 from '../../images/accessories/mirrow-4.png';

import seat2 from '../../images/accessories/seat2.png';
import seat3 from '../../images/accessories/seat3.png';

class BikeColorSection extends Component {
  static propTypes = {
    availableColors: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string,
      imageURL: propTypes.string,
    })).isRequired,
    changeColor: propTypes.func.isRequired,
    selectedColorIndex: propTypes.number.isRequired,
  };

  render() {
    const { availableColors, selectedColorIndex, changeColor } = this.props;
    const selectedColor = availableColors[selectedColorIndex];

    const colorOptions = availableColors.map((color, index) => (
      <div key={color.name} className="dashboard-card_items">
        <Radio
          value={color.name}
          name="setColor"
          onChange={() => changeColor(index)}
          checked={selectedColor.name === color.name}
        />

        <Image
          alt={color.name}
          className="color-img"
          width="40px"
          height="40px"
          src={color.imageURL}
        />
        <p className="fw-bold txt-med-gray">{color.name}</p>
      </div>
    ));

    const mirrorOptions =
      <div className="dashboard-card_items-container">
        <div className="dashboard-card_items">
          <Radio
            name="setMirrow"
            disabled
          />

          <Image
            alt="un espejo"
            className="color-img"
            width="60px"
            height="60px"
            src={mirrow1}
          />
        </div>
        <div className="dashboard-card_items">
          <Radio
            name="setMirrow"
            disabled
          />

          <Image
            alt="un espejo"
            className="color-img"
            width="60px"
            height="60px"
            src={mirrow2}
          />
        </div>
        <div className="dashboard-card_items">
          <Radio
            name="setMirrow"
            disabled
          />

          <Image
            alt="un espejo"
            className="color-img"
            width="60px"
            height="60px"
            src={mirrow4}
          />
        </div>
      </div>;

    const seatOptions =
      <div className="dashboard-card_items-container">
        <div className="dashboard-card_items">
          <Radio
            name="setMirrow"
            disabled
          />

          <Image
            alt="un asiento"
            className="color-img"
            width="60px"
            height="60px"
            src={seat2}
          />
        </div>
        <div className="dashboard-card_items">
          <Radio
            name="setMirrow"
            disabled
          />

          <Image
            alt="un asiento"
            className="color-img"
            width="60px"
            height="60px"
            src={seat3}
          />
        </div>
      </div>;

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: '#67CC4F' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon className="txt-green" size="large" name="check" />
            </Grid.Column>
            <Grid.Column width={15}>
              <h3 className="fw-bold fs-big">¡Podés personalizarla! <span className="txt-green fs-tinny uppercase">¡gratis!</span></h3>
              <div className="fw-bold txt-med-gray">Elegí el color que más te guste</div>
              <div className="dashboard-card_items-container">
              {colorOptions}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className="fw-bold txt-med-gray">Elegí los espejos <span className="fw-normal">(próximamente)</span></div>
              {mirrorOptions}
            </Grid.Column>
            <Grid.Column width={7}>
              <div className="fw-bold txt-med-gray">Elegí el asiento <span className="fw-normal">(próximamente)</span></div>
              {seatOptions}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = store => ({
  selectedColorIndex: store.main.customization.color,
});

const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeBikeColor(color)),
});

export default translate('customization')(connect(mapStateToProps, mapDispatchToProps)(BikeColorSection));
