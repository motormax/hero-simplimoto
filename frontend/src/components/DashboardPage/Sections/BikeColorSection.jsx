import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Grid, Icon, Image, Segment } from 'semantic-ui-react';


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
      <Grid.Column width={3}>
        <Image
          width="40px"
          height="40px"
          src={color.imageURL}
          onClick={() => { this.changeSelected(color); }}
        />
      </Grid.Column>
    ));

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: '#21ba45' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color="green" name="check" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">Color de moto ({selectedColor.name})</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            {colorOptions}
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default BikeColorSection;
