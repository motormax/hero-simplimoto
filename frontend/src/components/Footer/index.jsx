import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Divider, Grid, Icon, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import logoUrl from '../hero-logo.png';
import FooterBike from './FooterBike';


class Footer extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    isBuying: propTypes.bool.isRequired,
  };

  render() {
    const { t, isBuying } = this.props;

    return (
      <footer className="footer">
        <Container>
          <img className="footer-img" alt="Hero digital" src={logoUrl} />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <List>
                  <List.Item>
                    <Icon className="txt-med-gray map marker alternate" />
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
                {isBuying ? <FooterBike /> : null}
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

const mapStateToProps = store => ({
  isBuying: !!(store.main.lead && store.main.lead.motorcycle),
});

export default translate('footer')(connect(mapStateToProps)(Footer));
