import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import { Button, Form, Card, Divider, Image, Segment, Icon } from 'semantic-ui-react';
import { insuranceSelected, insuranceOptOut } from '../../actions/insuranceChoices';
import { PROVINCE_CABA, PROVINCE_BSAS, PERSONAL_INSURANCE, HERO_INSURANCE } from './constants';
import { cabaInsuranceLocations, bsasInsuranceLocations } from './insuranceLocations';

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
      motorcycle: propTypes.shape({
        id: propTypes.string,
      }),
    }).isRequired,
    optInOrOut: propTypes.string.isRequired,
    query: propTypes.shape({
      province: propTypes.string,
      postalCode: propTypes.string,
      age: propTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      insuranceQuotes: [],
      optInOrOut: HERO_INSURANCE,
      query: Object.assign({}, props.query),
      errors: {
        province: false,
        postalCode: false,
        age: false,
      },
    };
  }

  getQuote = (event) => {
    event.preventDefault();
    axios.get(`api/leads/${this.props.lead.id}/insurance_quotes`, {
      params: {
        motorcycle_id: this.props.lead.motorcycle.id,
        opt_in_or_out: this.props.optInOrOut,
        ...this.state.query,
      },
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
    const newData = this.state.query;
    newData[inputName] = value;
    this.setState({ query: newData });
  }

  handleDropdownOptInOrOutChange = (e, selectObj) => {
    this.setState({ optInOrOut: selectObj.value });
  }

  handleHeroInsuranceDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.query;
    newData[inputName] = value;
    this.setState({ query: newData });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let quotesList;
    if (this.state.insuranceQuotes.length > 0) {
      const quoteItems =
            this.state.insuranceQuotes.map(quote => (
              <Card>
                <Card.Content>
                  <Image src={quote.brokerLogo} />
                  <Card.Header>{quote.broker}</Card.Header>
                  <Card.Description>{quote.policy}</Card.Description>
                  <Card.Meta>Ver mas información <Icon name="info circle" /></Card.Meta>

                </Card.Content>
                <Card.Content className="btn-displaced-container txt-center">
                  <div className="fs-big txt-dark-gray txt-center">AR$<span className="fw-bold fs-big">{quote.price}</span>/ mes </div>
                  <Button
                    primary
                    className="btn-displaced"
                    onClick={() => {
                            this.props.selectInsurance(
                              quote,
                              this.state.optInOrOut,
                              this.state.query,
                              this.props.lead,
                            );
                    }}
                  >
                  Elegir
                  </Button>
                </Card.Content>
              </Card>));
      quotesList = (
        <div className="margin-bottom">
          <Divider />
          <Card.Group centered>
            {quoteItems}
          </Card.Group>
        </div>
      );
    }
    let heroQuery;
    if (this.state.optInOrOut === HERO_INSURANCE) {
      heroQuery = (
        <Segment attached padded>
          <Form.Group widths="equal">
            <Form.Select
              search
              required
              label="Provincia"
              name="province"
              options={[{ value: PROVINCE_CABA, text: PROVINCE_CABA },
                { value: PROVINCE_BSAS, text: PROVINCE_BSAS }]}
              value={this.state.query.province}
              error={this.state.errors.province}
              onChange={this.handleDropdownChange}
              placeholder="Provincia"
            />
            <Form.Select
              search
              required
              label="Código postal"
              name="postalCode"
              options={this.state.query.province === PROVINCE_CABA ?
                cabaInsuranceLocations : bsasInsuranceLocations}
              value={this.state.query.postalCode}
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
              value={this.state.query.age}
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
          <p className="txt-med-gray txt-center fs-large">Al momento de concretar la compra te pediremos más datos para completar el seguro de tu moto</p>
        </Segment>);
    } else {
      heroQuery = (
        <Segment attached="bottom" className="txt-center">
          <Button
            size="large"
            primary
            onClick={() => {
              this.props.selectMyOwnInsurance(this.props.lead);
            }}
          >Continuar
          </Button>
        </Segment>
      );
    }

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">¿Como queres asegurarte?</h2>
        <p className="fs-huge txt-med-gray txt-center">Asegurá tu moto con la prestadora que te sea mas conveniente, <br /> nosotros nos ocupamos del papeleo.</p>
        <Card className="page-column-card">
          <Form onSubmit={this.handleSubmit} error={error}>
            <Form.Select
              fluid
              options={optInOrOutOptions}
              name="optInOrOut"
              value={this.state.optInOrOut}
              onChange={this.handleDropdownOptInOrOutChange}
              className="fs-big"
            />
            {heroQuery}
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  lead: store.main.lead,
  query: store.main.insurance.query,
});

const mapDispatchToProps = dispatch => ({
  cancelQuote: () => {
    dispatch(push('/dashboard'));
  },
  selectMyOwnInsurance: async (lead) => {
    const body = {
      insurance_choice: {
        opt_in_or_out: PERSONAL_INSURANCE,
        motorcycle_id: lead.motorcycle.id,
      },
    };
    axios.post(
      `/api/leads/${lead.id}/insurance`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceOptOut());
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
  selectInsurance: async (quote, optInOrOut, query, lead) => {
    const body = {
      insurance_choice: {
        opt_in_or_out: optInOrOut,
        motorcycle_id: lead.motorcycle.id,
        insurance_broker_id: quote.brokerId,
        insurance_policy_id: quote.policyId,
        quote_price: quote.price,
        quote_broker_name: quote.brokerName,
        quote_broker_logo_url: quote.brokerLogo,
        quote_policy: quote.policy,
        quote_more_info: quote.moreInfo,
        query_postal_code: query.postalCode,
        query_age: query.age,
        query_province: query.province,
      },
    };

    axios.post(
      `/api/leads/${lead.id}/insurance`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceSelected(quote, query));
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
});

export default translate('insurance')(connect(mapStateToProps, mapDispatchToProps)(InsurancePage));
