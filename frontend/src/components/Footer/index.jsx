import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Divider, Grid, Icon, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isMobileOnly } from 'react-device-detect';

import logoUrl from '../hero-logo.png';
import FooterBike from './FooterBike';


class Footer extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    isBuying: propTypes.bool.isRequired,
    goToPrivacyPolicy: propTypes.func.isRequired,
    goToResponsibilityDisclaimer: propTypes.func.isRequired,
  };

  render() {
    const { t, isBuying } = this.props;

    return (
      <footer className="footer">
        <Container>
          <img className="footer-img" alt="Hero digital" src={logoUrl} />
          <Grid stackable columns={2}>
            <Grid.Row>
              <Grid.Column width={isMobileOnly ? 15 : 5}>
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
                    <Icon className="txt-med-gray" name="whatsapp" />
                    <List.Content>
                      {t('whatsapp')}:
                      <span className="fw-bold"> {t('whatsapp_phone_number')}</span>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon className="txt-med-gray" name="mail" />
                    <List.Content>
                      {t('email')}: <a href={`mailto:${t('email_adress')}`}>{t('email_adress')}</a>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3} style={isMobileOnly ? { display: 'none' } : {}}>
                <List>
                  <List.Item>
                    <List.Header>{t('know_our_bikes')}</List.Header>
                  </List.Item>
                  <List.Item><a href="http://heromotos.com.ar/modelos/hunk-sports" target="_blank" rel="noopener noreferrer">{t('hunk_sport')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/modelos/hunk" target="_blank" rel="noopener noreferrer">{t('hunk')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/modelos/ignitor" target="_blank" rel="noopener noreferrer">{t('ignitor')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/modelos/dash" target="_blank" rel="noopener noreferrer">{t('dash')}</a></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3} style={isMobileOnly ? { display: 'none' } : {}}>
                <List>
                  <List.Item>
                    <List.Header>{t('support')}</List.Header>
                  </List.Item>
                  <List.Item><a href="http://heromotos.com.ar/registra-tu-hero" target="_blank" rel="noopener noreferrer">{t('family')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/consejos" target="_blank" rel="noopener noreferrer">{t('advice')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/plan-servicio-y-mantenimiento" target="_blank" rel="noopener noreferrer">{t('maintenance')}</a></List.Item>
                  <List.Item><a href="http://heromotos.com.ar/sistema-i3s" target="_blank" rel="noopener noreferrer">{t('i3s')}</a></List.Item>
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
            <List.Item
              as="a"
              onClick={() => {
              this.props.goToPrivacyPolicy();
            }}
            >{t('privacy_policy')}
            </List.Item>
            <List.Item
              as="a"
              onClick={() => {
              this.props.goToResponsibilityDisclaimer();
            }}
            >{t('disclaimer')}
            </List.Item>
          </List>
          <List horizontal link>
            <List.Item>
              <List.Header>{t('follow_us')}</List.Header>
            </List.Item>
            <List.Item as="a" href="https://www.facebook.com/heromotosargentina" target="_blank" rel="noopener noreferrer"><Icon name="facebook square" /></List.Item>
            <List.Item as="a" href="https://www.instagram.com/heromotosarg" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></List.Item>
          </List>
        </Container>
      </footer>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  goToPrivacyPolicy: () => {
    dispatch(push('/privacy-policy'));
  },
  goToResponsibilityDisclaimer: () => {
    dispatch(push('/responsibility-disclaimer'));
  },
});

const mapStateToProps = store => ({
  isBuying: !!(store.main.lead && store.main.lead.motorcycle),
});

export default translate('footer')(connect(mapStateToProps, mapDispatchToProps)(Footer));
