import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Segment, Icon, Grid, Checkbox } from 'semantic-ui-react';


import glovesImgUrl from './../../images/Guantes.png';
import helmetImgUrl from './../../images/Casco.png';
import trunkImgUrl from './../../images/Baul.png';

class AccessoriesSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    // saveFinancing: propTypes.func.isRequired,
  }

  render() {
    const { t } = this.props;

    const isOk = true;
    const color = isOk ? 'gray' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color={color} name="arrow right" />
            </Grid.Column>
            <Grid.Column width={15}>
              <h3 className="fw-bold fs-big">
                {t('accessories')}
                <span className="fs-medium txt-dark-gray"><span className="fw-normal">{t('currency_sign')}</span>1.200</span>
              </h3>
              <div className="dashboard-card_items-container">
                <div className="dashboard-card_items">
                  <Checkbox defaultChecked />
                  <img src={glovesImgUrl} />
                  <div className="accessorie_item_details">
                    <p className="fw-bold txt-med-gray">{t('gloves')}</p>
                    <p className="txt-med-gray">{t('currency_sign')}<span className="fw-bold">800</span></p>
                  </div>
                </div>
                <div className="dashboard-card_items">
                  <Checkbox defaultChecked />
                  <img src={helmetImgUrl} />
                  <div className="accessorie_item_details">
                    <p className="fw-bold txt-med-gray">{t('helmet')}</p>
                    <p className="txt-med-gray">{t('currency_sign')}<span className="fw-bold">800</span></p>
                  </div>
                </div>
                <div className="dashboard-card_items">
                  <Checkbox defaultChecked />
                  <img src={trunkImgUrl} />
                  <div className="accessorie_item_details">
                    <p className="fw-bold txt-med-gray">{t('trunk')}</p>
                    <p className="txt-med-gray">{t('currency_sign')}<span className="fw-bold">800</span></p>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('accessories_section')(AccessoriesSection);
