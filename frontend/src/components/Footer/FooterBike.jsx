import React, { Component } from 'react';
import propTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Button, Card, Grid, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { cancelPurchase } from '../../actions/beginning';

import availableMotorcycles from '../motorcycles/availableMotorcycles';
import availableColors from '../motorcycles/availableColors';

class SmallBike extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    currentBikeModel: propTypes.string.isRequired,
    currentColor: propTypes.number.isRequired,
    cancelPurchase: propTypes.func.isRequired,
  };

  render() {
    const { t, currentBikeModel, currentColor } = this.props;

    const bikeDisplayName = availableMotorcycles[currentBikeModel].displayName;
    const bikeImageUrl = availableColors[currentBikeModel][currentColor].bikeImageURL;

    return (
      <List>
        <List.Item>
          <List.Header>{t('you_are_buying')}</List.Header>
        </List.Item>
        <List.Item>
          <Card className="gray-card">
            <Grid>
              <Grid.Row>
                <Grid.Column width={5}>
                  <img className="bike-img" alt={bikeImageUrl} src={bikeImageUrl} />
                </Grid.Column>
                <Grid.Column width={11}>
                  <div>
                    <span className="bike-name fw-bold fs-large">{bikeDisplayName}</span>
                    <Button
                      className="btn-outline"
                      secondary
                      fluid
                      onClick={() => {
                        this.props.cancelPurchase();
                      }}
                    >
                      {t('cancel_order')}
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card>
        </List.Item>
      </List>);
  }
}

const mapDispatchToProps = dispatch => ({
  cancelPurchase: () => {
    dispatch(cancelPurchase());
    dispatch(push('/'));
  },
});

const mapStateToProps = store => ({
  currentBikeModel: store.main.lead.motorcycle.name,
  currentColor: store.main.customization.color,
});

export default translate('footer')(connect(mapStateToProps, mapDispatchToProps)(SmallBike));
