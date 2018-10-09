import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class TradeInSection extends Component {
  static propTypes = {
    goToTradeIn: propTypes.func.isRequired,
  };

  render() {
    return (
      <Segment className="dashboard-card" inverted>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">
                Vender tu moto usada
              </h3>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button fluid primary onClick={() => this.props.goToTradeIn()}>
                Quiero vender mi moto
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={15}>
              <div>Cargá los datos de tu moto y te ayudamos a venderla</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.main.lead,
  tradeIn: state.main.tradeIn,
});

const mapDispatchToProps = dispatch => ({
  goToTradeIn: () => {
    dispatch(push('/trade-in'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeInSection);
