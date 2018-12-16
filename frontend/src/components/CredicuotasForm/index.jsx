/* eslint-env browser */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Segment } from 'semantic-ui-react';
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
    }).isRequired,
    accessoriesPrice: propTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      fullName: '',
      phone: '',
      email: '',
      docNumber: '',
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

  canSubmit = () => {
    if (!this.state.email || !this.state.email.includes('@')) {
      return false;
    }

    if (!this.state.fullName || !(this.state.fullName.length > 5)) {
      return false;
    }

    if (!this.state.docNumber || !(this.state.docNumber.length > 7)) {
      return false;
    }

    if (!this.state.phone || !(this.state.phone.length > 6)) {
      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitInProgress: true });

    const {
      email, fullName, docNumber, phone,
    } = this.state;

    this.props
      .createPurchaseOrder(this.props.lead.id, email, fullName, docNumber, phone)
      .catch(() => {
        this.setState({ submitInProgress: false });
      });

    return false;
  };

  render() {
    return (
      <div>
        <Form id="pay" onSubmit={this.handleSubmit} ref={this.paymentMethodForm}>
          <Segment attached>
            <FinancingInfo
              financingSelected={this.props.financingSelected}
              financingForm={this.props.financingForm}
              accessoriesPrice={this.props.accessoriesPrice}
              motorcycle={this.props.motorcycle}
            />
          </Segment>

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
            <Form.Input
              fluid
              required
              label="Nombre completo"
              type="text"
              name="fullName"
              placeholder="Tu nombre completo"
              value={this.state.fullName}
              onChange={this.handleFormDataChange}
            />
            <Form.Input
              fluid
              required
              label="Nro de documento"
              type="text"
              data-checkout="docNumber"
              name="docNumber"
              placeholder="5123456"
              value={this.state.docNumber}
              onChange={this.handleFormDataChange}
            />
            <Form.Input
              fluid
              required
              label="Teléfono"
              type="tel"
              name="phone"
              placeholder="Teléfono de linea o celular"
              value={this.state.phone}
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
  createPurchaseOrder: async (leadId, email, fullName, docNumber, phone) => {
    const response = await axios.post(
      `/api/leads/${leadId}/purcharse_order`,
      {
        email,
        full_name: fullName,
        doc_number: docNumber,
        phone,
      },
    );
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
