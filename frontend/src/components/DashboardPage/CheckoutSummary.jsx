import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Card, Icon, List, Divider } from 'semantic-ui-react';

import bankImage from './../images/banks-logos/icbc-logo.png';

class CheckoutSummary extends Component {
  render() {
    const bikeName = 'Moto Piola';
    const bankName = 'ICBC';

    return (
      <div className="checkoutSummary">
        <Card fluid>
          <h3 className="summary-title">Resumen de tu Moto</h3>

          <Card.Content>
            <List className="summary-list" verticalAlign="middle">
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>30,000</span>
                </List.Content>
                <List.Content>{bikeName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Personalización</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>1,200</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Accesorios</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="fw-normal fs-small txt-med-gray">AR$</span>
                  <span>1,200</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Patentamiento online</List.Content>
              </List.Item>
              <List.Item>
                <List.Content className="price-column" floated="right">
                  <span className="txt-green fs-small uppercase">¡gratis!</span>
                </List.Content>
                <Icon name="arrow right" />
                <List.Content>Entrega a domicilio</List.Content>
              </List.Item>
            </List>

            <Divider />

            <List className="summary-list">
              <List.Item>
                <Icon name="arrow right" />
                <List.Content>Financiación</List.Content>
              </List.Item>
            </List>

            <div>
              <p className="final-price">AR$<span className="final-price-number">10,000</span>/ month </p>
            </div>

            <div className="finnancial-bank">
              <img src={bankImage} alt={bankName} />
              <div className="right-column txt-dark-gray">
                <p className="fw-bold fs-small">Préstamo {bankName}</p>
                <p className="fs-tinny">85 cuotas de AR$ 1,300-</p>
                <p className="fs-large">CFT: 48.12%</p>
              </div>
            </div>

          </Card.Content>
        </Card>

        <Card fluid>
          <Card.Content className="btn-displaced-container">
            <List className="summary-list">
              <List.Item className="summary-list-btn-container">
                <Icon name="arrow right" />
                <List.Content>Seguro</List.Content>
                <Button className="btn-outline" size="medium" secondary fluid>Elegir seguro</Button>
              </List.Item>
            </List>
            <Button className="btn-displaced" size="huge" secondary>Preparar la Compra</Button>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

export default translate('checkout')(CheckoutSummary);
