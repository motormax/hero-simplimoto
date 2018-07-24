import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Container, Grid, List, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';


import logoUrl from './hero-logo.png';

class Footer extends Component{

  static propTypes = {
    t: propTypes.func.isRequired,
  };

  render(){

    const {t} = this.props;

    return (
      <footer>
        <Container>
          <img className="logo" alt="Hero digital" src={logoUrl} />
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <List>
                  <List.Item>
                    <Icon name='map marker alternate' />
                    <List.Content>
                      <List.Header>{t('company_name')}</List.Header>
                      <List.Description>{t('company_adress')}</List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon name='phone' />
                    <List.Content>
                      {t('showroom')} : <span> {t('showroom_phone_number')} </span>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Icon name='mail' />
                    <List.Content>
                      {t('email')} : <span>{t('email_adress')} </span>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </footer>
    );
  }

};

export default translate('footer') (Footer);
