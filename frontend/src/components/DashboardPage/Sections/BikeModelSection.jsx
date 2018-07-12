import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Icon } from 'semantic-ui-react';


class BikeModelSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { motorcycle } = this.props;

    return (
      <Card fluid color="green">
        <Card.Content>
          <Card.Header>
            <Icon color="green" name={'check circle outline'} />
            Modelo
          </Card.Header>
          <Card.Meta>{`${motorcycle.name}|${motorcycle.price}`}</Card.Meta>
          <Card.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc pulvinar tristique nisi et posuere
          </Card.Description>
          <Card.Content textAlign="right" extra>
            <Button primary>Cambiar</Button>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default BikeModelSection;
