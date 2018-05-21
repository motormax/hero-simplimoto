import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';
import { push } from 'react-router-redux';

class MainPage extends Component {
  static propTypes = {
    pickBike: propTypes.func.isRequired,
  }

  render() {
    return (
      <Card>
        <Image src="https://www.heromotocorp.com/en-in/uploads/bike/bike_color_pic/20160714051026-color-main-383.png" />
        <Card.Content>
          <Card.Header>Hunk</Card.Header>
          <Card.Meta> <span className="date">$ 20,000.00</span> </Card.Meta>
          <Card.Description>An awesome bike</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button size="big" primary onClick={() => { this.props.pickBike('HUNK'); }}>Comprar</Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: (bikeModel) => {
    dispatch({ type: 'CHANGE_BIKE_MODEL', bikeModel });
    dispatch(push('/dashboard'));
  },
});

export default connect(undefined, mapDispatchToProps)(MainPage);
