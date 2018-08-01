import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';

import { Button, Form, Card, Divider, Image, Segment, Icon } from 'semantic-ui-react';
import Slider from 'react-slick';

import { insuranceSelected, insuranceOptOut } from '../../actions/insuranceChoices';

import { PROVINCE_CABA, PROVINCE_BSAS } from './constants';
import { cabaInsuranceLocations, bsasInsuranceLocations } from './insuranceLocations';

const PERSONAL_INSURANCE = 'personalInsurance';
const HERO_INSURANCE = 'heroInsurance';

const optInOrOutOptions = [{
    key: HERO_INSURANCE,
    text: 'Quiero cotizar mi seguro con Hero',
    value: HERO_INSURANCE,
  },
  {
    key: PERSONAL_INSURANCE,
    text: 'Voy a contratar mi propio seguro',
    value: PERSONAL_INSURANCE,
  }];

class InsurancePage extends Component {
  static propTypes = {
    selectInsurance: propTypes.func.isRequired,
    cancelQuote: propTypes.func.isRequired,
    selectMyOwnInsurance: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      insuranceQuotes: [],
      insuranceForm: {
        optInOrOut: HERO_INSURANCE,
        province: PROVINCE_CABA,
        postalCode: '',
        age: '',
      },
      errors: {
        postalCode: false,
        age: false,
      },
    };
  }

  getQuote = (event) => {
    event.preventDefault();
    axios.get(`api/leads/${this.props.lead.id}/insurance/quote`, {
      params: this.state.insuranceForm,
    })
      .then((response) => {
        console.log(response.data.data); // eslint-disable-line no-console
        this.setState({ insuranceQuotes: response.data.data });
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      })
      .then(() => {
        // always executed
      });
  };

  handleDropdownChange = (e, selectObj) => {
    const { name: inputName, value } = selectObj;
    console.log(inputName);
    console.log(value);
    const newData = this.state.insuranceForm;
    newData[inputName] = value;
    console.log(newData);
    this.setState({ insuranceForm: newData });
  }

  handleHeroInsuranceDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.insuranceForm;
    newData[inputName] = value;
    this.setState({ insuranceForm: newData });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let quotesList;
    if (this.state.insuranceQuotes.length > 0) {
      const quoteItems =
            this.state.insuranceQuotes.map(broker =>
              broker.brokerQuotes.map(quote => (
                  <Card>
                    <Card.Content>
                      <Image src={broker.brokerLogo} />
                      <Card.Header>{broker.brokerName}</Card.Header>
                      <Card.Description>{quote.policy}</Card.Description>
                      <Card.Meta><a>Ver mas información <Icon name="info circle" /></a></Card.Meta>

                    </Card.Content>
                    <Card.Content className="btn-displaced-container">
                      <div className="fs-big txt-dark-gray txt-center">AR$<span className="fw-bold fs-big">{quote.price}</span>/ mes </div>
                      <Button
                        primary
                        className="btn-displaced"
                        onClick={() => {
                              this.props.selectInsurance(
                                quote,
                                this.state.insuranceForm,
                                broker.brokerName,
                                broker.brokerLogo,
                                this.props.lead.id,
                              );
}}
                      >Elegir
                      </Button>
                    </Card.Content>
                  </Card>
                )));
      quotesList = (
        <div className="margin-bottom">
          <Divider />
          <Card.Group centered>
          {quoteItems}
          </Card.Group>
        </div>
      );
    }
    let heroInsuranceForm;
    if (this.state.insuranceForm.optInOrOut === HERO_INSURANCE) {
      heroInsuranceForm = (
        <Segment attached padded>
          <Form.Group widths="equal">
            <Form.Select
              search
              required
              label="Provincia"
              name="province"
              options={[{ value: PROVINCE_CABA, text: PROVINCE_CABA },
                { value: PROVINCE_BSAS, text: PROVINCE_BSAS }]}
              value={this.state.insuranceForm.province}
              error={this.state.errors.province}
              onChange={this.handleDropdownChange}
              placeholder="Provincia"
            />
            <Form.Select
              search
              required
              label="Código postal"
              name="postalCode"
              options={this.state.insuranceForm.province === PROVINCE_CABA ?
                cabaInsuranceLocations : bsasInsuranceLocations}
              value={this.state.insuranceForm.postalCode}
              error={this.state.errors.postalCode}
              onChange={this.handleDropdownChange}
              placeholder="Código postal"
            />
            <Form.Input
              fluid
              required
              label="Edad"
              type="text"
              name="age"
              value={this.state.insuranceForm.age}
              error={this.state.errors.age}
              onChange={this.handleHeroInsuranceDataChange}
            />
          </Form.Group>
          <div className="txt-center">
            <Button size="large" primary onClick={this.getQuote} >Cotizar</Button>
            <Button onClick={() => {
                      this.props.cancelQuote();
                    }}
            >Cancelar
            </Button>
          </div>
          {quotesList}
          <Divider />
          <p className="txt-med-gray italic fs-small">Al momento de concretar la compra te pediremos más datos para completar el seguro de tu moto</p>
        </Segment>);
    } else {
      heroInsuranceForm = (
        <Segment attached="bottom" className="txt-center">
          <Button
            size="large"
            primary
            onClick={() => {
              this.props.selectMyOwnInsurance(this.props.lead.id);
            }}
            >Continuar
          </Button>
        </Segment>
      );
    }

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Como queres asegurarte?</h2>
        <p className="fs-huge txt-med-gray txt-center">Asegurá tu moto con la prestadora que te sea mas conveniente, <br/> nosotros nos ocupamos del papeleo.</p>
        <Card className="page-column-card">
          <Form onSubmit={this.handleSubmit} error={error}>
              <Form.Select
                fluid
                options={optInOrOutOptions}
                name='optInOrOut'
                value={this.state.insuranceForm.optInOrOut}
                onChange={this.handleDropdownChange}
                className="fs-big"
               />
            {heroInsuranceForm}
          </Form>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  lead: store.main.lead,
});

const mapDispatchToProps = dispatch => ({
  cancelQuote: () => {
    dispatch(push('/dashboard'));
  },
  selectMyOwnInsurance: async (leadId) => {
    axios.post(
      `/api/leads/${leadId}/insurance/opt-out`,
      {
        lead: leadId,
      },
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceOptOut());
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
  selectInsurance: async (quote, insuranceForm, brokerName, brokerLogo, leadId) => {
    axios.post(
      `/api/leads/${leadId}/insurance/quote`,
      {
        lead: leadId,
        quote: {
          id: quote.id,
          price: quote.price,
          broker: brokerName,
        },
        insuranceForm,
      },
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceSelected(quote, brokerName, brokerLogo));
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
});

export default translate('insurance')(connect(mapStateToProps, mapDispatchToProps)(InsurancePage));
