import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Container, Divider, Grid, Icon, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import logoUrl from './hero-logo.png';
import availableMotorcycles from './motorcycles/availableMotorcycles';

class Footer extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    currentBikeModel: propTypes.string.isRequired,
  };

  render() {
    const { t, currentBikeModel } = this.props;

    let youAreBuying;
    if (currentBikeModel) {
      const bikeImageUrl = availableMotorcycles[currentBikeModel].imageUrl;
      const bikeDisplayName = availableMotorcycles[currentBikeModel].displayName;
      youAreBuying = (
        <List>
          <List.Item>
            <List.Header>{t('you_are_buying')}</List.Header>
          </List.Item>
          <List.Item>
            <Card className="gray-card">
              <Grid fluid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <img className="bike-img" alt={bikeImageUrl} src={bikeImageUrl} />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <div>
                      <span className="bike-name fw-bold fs-large">{bikeDisplayName}</span>
                      <Button className="btn-outline" secondary fluid>{t('cancel_order')}</Button>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
          </List.Item>
        </List>);
    }

    return (
      <footer className="footer">
        <Container>
          <img className="footer-img" alt="Hero digital" src={logoUrl} />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <List>
                  <List.Item>
                    <Icon className="txt-med-gray" name="map marker alternate" />
                    <List.Content>
                      <List.Header className="uppercase">{t('company_name')}</List.Header>
                      <List.Description className="txt-med-gray">{t('company_address')}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon className="txt-med-gray" name="phone" />
                    <List.Content>
                      {t('showroom')}:
                      <span className="fw-bold"> {t('showroom_phone_number')}</span>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon className="txt-med-gray" name="mail" />
                    <List.Content>
                      {t('email')}: {t('email_adress')}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <List>
                  <List.Item>
                    <List.Header>{t('know_our_bikes')}</List.Header>
                  </List.Item>
                  <List.Item>{t('hunk_sport')}</List.Item>
                  <List.Item>{t('hunk')}</List.Item>
                  <List.Item>{t('ignitor')}</List.Item>
                  <List.Item>{t('dash')}</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <List>
                  <List.Item>
                    <List.Header>{t('support')}</List.Header>
                  </List.Item>
                  <List.Item>{t('family')}</List.Item>
                  <List.Item>{t('advice')}</List.Item>
                  <List.Item>{t('maintenance')}</List.Item>
                  <List.Item>{t('i3s')}</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={5}>
                {youAreBuying}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Divider />
        <Container>
          <List floated="right" celled horizontal link>
            <List.Item as="a">{t('privacy_policy')}</List.Item>
            <List.Item as="a">{t('disclaimer')}</List.Item>
          </List>
          <List horizontal link>
            <List.Item>
              <List.Header>{t('follow_us')}</List.Header>
            </List.Item>
            <List.Item as="a"><Icon name="facebook square" /></List.Item>
            <List.Item as="a"><Icon name="instagram" /></List.Item>
          </List>
        </Container>
      </footer>
    );
  }
}


const mapStateToProps = store => (
  store.main.user && store.main.user.motorcycle ?
    { currentBikeModel: store.main.user.motorcycle.name } :
    { currentBikeModel: undefined }
);

export default translate('footer')(connect(mapStateToProps)(Footer));
