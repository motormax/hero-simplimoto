/* eslint-env browser */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Icon, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import axios from 'axios';

import { cancelPurchase } from '../../actions/beginning';

import FinancingInfo from '../DashboardPage/Sections/FinancingInfo';

class CredicuotasForm extends Component {
  static propTypes = {
    motorcycle: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    }).isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    backToDashboard: propTypes.func.isRequired,
    createPurchaseOrder: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    financingForm: propTypes.shape({
      message: propTypes.string.isRequired,
      costs: propTypes.string.isRequired,
      monthlyAmount: propTypes.number.isRequired,
      issuerLogo: propTypes.string.isRequired,
      issuerName: propTypes.string.isRequired,
      paymentMethodName: propTypes.string.isRequired,
      paymentMethodLogo: propTypes.string.isRequired,
      paymentMethodId: propTypes.string.isRequired,
      issuerId: propTypes.string.isRequired,
      installments: propTypes.number.isRequired,
      provider: propTypes.string.isRequired,
    }).isRequired,
    accessoriesPrice: propTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      email: '',
      submitInProgress: false,
      canSubmit: false,
    };
  }

  handleFormDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state;
    newData[inputName] = value;
    this.setState(Object.assign({}, newData, { canSubmit: this.canSubmit() }));
    return value;
  };

  canSubmit = () => this.state.email && this.state.email.includes('@');

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitInProgress: true });

    this.props
      .createPurchaseOrder(this.props.lead.id, this.state.email)
      .catch(() => {
        this.setState({ submitInProgress: false });
      });

    return false;
  };

  paymentDetails() {
    if (this.props.financingForm.provider === 'BANK_TRANSFER') {
      return (
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={2}>
              <Icon className="txt-dark-gray" size="large" name="arrow right" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3 className="fw-bold fs-big">Forma de pago</h3>
            </Grid.Column>
            <Grid.Column width={5}>
              <span className="fs-large fw-bold">Transferencia bancaria</span>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column width={2} />
            <Grid.Column className="details-container" width={14}>
              <p className="txt-dark-gray"><b>Banco: </b>Banco Galicia</p>
              <p className="txt-dark-gray"><b>Tipo de cuenta: </b>Cuenta corriente en Pesos</p>
              <p className="txt-dark-gray"><b>Número de cuenta: </b>6001-3 019-1</p>
              <p className="txt-dark-gray"><b>CBU: </b>00700191-20000006001315</p>
              <p className="txt-dark-gray">O</p>
              <p className="txt-dark-gray"><b>Banco: </b>Banco Santander Río</p>
              <p className="txt-dark-gray"><b>Tipo de cuenta: </b>Cuenta corriente en Pesos</p>
              <p className="txt-dark-gray"><b>Número de cuenta: </b>039-004592/4</p>
              <p className="txt-dark-gray"><b>CBU: </b>00700191-20000006001315</p>
              <p className="txt-dark-gray">Empresa</p>
              <p className="txt-dark-gray"><b>A nombre de: </b>MARWEN S.A.</p>
              <p className="txt-dark-gray"><b>CUIT: </b>0720039720000000459240</p>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }

    return (
      <Segment attached>
        <FinancingInfo
          financingSelected={this.props.financingSelected}
          financingForm={this.props.financingForm}
          accessoriesPrice={this.props.accessoriesPrice}
          motorcycle={this.props.motorcycle}
        />
      </Segment>
    );
  }

  render() {
    return (
      <div>
        <Form id="pay" onSubmit={this.handleSubmit} ref={this.paymentMethodForm}>
          {this.paymentDetails()}

          <Segment attached>
            <Form.Input
              fluid
              required
              label="Email"
              type="email"
              name="email"
              placeholder="user@example.com"
              value={this.state.email}
              onChange={this.handleFormDataChange}
            />
          </Segment>
          <Segment attached className="txt-center">
            <Button
              type="submit"
              size="big"
              disabled={!this.state.canSubmit}
              primary
              loading={this.state.submitInProgress}
            >Comprar
            </Button>
            <Button
              size="large"
              secondary
              onClick={() => {
                  this.props.backToDashboard();
                }}
            >Volver
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  backToDashboard: async () => {
    dispatch(push('/dashboard'));
  },
  createPurchaseOrder: async (leadId, email) => {
    const response = await axios.post(`/api/leads/${leadId}/purcharse_order`, { email });
    console.log(response); // eslint-disable-line no-console
    dispatch(push('/success'));
    dispatch(cancelPurchase());
  },
});

const mapStateToProps = state => ({
  lead: state.main.lead,
  motorcycle: state.main.lead.motorcycle,
  accessoriesPrice: state.main.accessories.totalPrice,
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(CredicuotasForm));
