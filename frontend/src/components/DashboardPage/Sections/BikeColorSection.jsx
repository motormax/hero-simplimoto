import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Icon, Image, Segment, Radio } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { changeBikeColor } from '../../../actions/beginning';


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

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: '#67CC4F' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon className="txt-green" size="large" name="check" />
            </Grid.Column>
            <Grid.Column width={15}>
              <h3 className="fw-bold fs-big">¿De qué color? <span className="txt-green fs-tinny uppercase">¡gratis!</span></h3>
              <div className="dashboard-card_items-container">
                {colorOptions}
              </div>
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
