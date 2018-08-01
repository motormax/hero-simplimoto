import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Grid, Icon, Image, Segment, Radio } from 'semantic-ui-react';


class BikeColorSection extends Component {
  static propTypes = {
    availableColors: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string,
      imageURL: propTypes.string,
    })).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: props.availableColors[0],
    };
  }

  changeSelected = (color) => {
    this.setState({
      selectedColor: color,
    });
  };

  render() {
    const { selectedColor } = this.state;
    const { availableColors } = this.props;

    const colorOptions = availableColors.map(color => (
      <div className="dashboard-card_items">
        <Radio
          value={color.name}
          name="setColor"
          onChange={() => { this.changeSelected(color); }}
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
      <Segment className="dashboard-card" style={{ borderLeftColor: 'darkgray' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={15}>
              <h3 className="fw-bold fs-big">Personalización <span className="txt-green fs-small uppercase">¡gratis!</span></h3>
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

export default BikeColorSection;
