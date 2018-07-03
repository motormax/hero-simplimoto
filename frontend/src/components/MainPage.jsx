import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { userFetched } from '../actions/beginning';

class MainPage extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    pickBike: propTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <Card>
        <Image src="https://www.heromotocorp.com/en-in/uploads/bike/bike_color_pic/20160714051026-color-main-383.png" />
        <Card.Content>
          <Card.Header>Hunk</Card.Header>
          <Card.Meta> <span className="date">$ 20,000.00</span> </Card.Meta>
          <Card.Description>An awesome bike</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button size="big" primary onClick={() => { this.props.pickBike('HUNK'); }}>{t('buy')}</Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pickBike: async (bikeModel) => {
    const { data: { data: user } } = await axios.post("/api/users/", {});

    dispatch(userFetched(user));
    dispatch(push('/dashboard'));
  },
});

export default translate('index')(connect(undefined, mapDispatchToProps)(MainPage));
