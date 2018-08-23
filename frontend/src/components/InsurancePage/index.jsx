/* eslint react/no-danger: 0 */
import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import { Button, Form, Card, Divider, Image, Segment, Icon, Search, Popup, Message } from 'semantic-ui-react';
import { insuranceSelected, insuranceOptOut, insuranceChoiceFetched } from '../../actions/insuranceChoices';
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
    backToDashboard: propTypes.func.isRequired,
    selectMyOwnInsurance: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
      motorcycle: propTypes.shape({
        id: propTypes.number,
      }),
    }).isRequired,
    insuranceChoice: propTypes.shape({
      opt_in_or_out: propTypes.string,
      query_province: propTypes.string,
      query_postal_code: propTypes.string,
      query_age: propTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      insuranceQuotes: [],
      optInOrOut: props.insuranceChoice.opt_in_or_out,
      insuranceChoice: {
        query_province: props.insuranceChoice.query_province,
        query_postal_code: props.insuranceChoice.query_postal_code,
        query_age: props.insuranceChoice.query_age,
      },
      isLoading: false,
      value: '',
      results: [],
      hasSearchedHeroInsurance: false,
      errors: {
        query_province: false,
        query_postal_code: false,
        query_age: false,
      },
    };
  }

  getQuote = (event) => {
    event.preventDefault();
    axios.get(`api/leads/${this.props.lead.id}/insurance_quotes`, {
      params: {
        motorcycle_id: this.props.lead.motorcycle.id,
        ...this.state.insuranceChoice,
      },
    })
      .then((response) => {
        console.log(response.data.data); // eslint-disable-line no-console
        this.setState({
          insuranceQuotes: response.data.data,
          hasSearchedHeroInsurance: true,
        });
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      })
      .then(() => {
        // always executed
      });
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleDropdownChange = (e, selectObj) => {
    const { name: inputName, value } = selectObj;
    const newData = this.state.insuranceChoice;
    newData[inputName] = value;
    this.setState({ insuranceChoice: newData });
  }

  handleDropdownOptInOrOutChange = (e, selectObj) => {
    this.setState({
      optInOrOut: selectObj.value,
      hasSearchedHeroInsurance: false,
    });
  }

  handleHeroInsuranceDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.insuranceChoice;
    newData[inputName] = value;
    this.setState({ insuranceChoice: newData });
  };

  handleResultSelect = (e, { result }) => {
    this.setState({
      insuranceChoice: {
        query_postal_code: result.text,
        query_age: this.state.insuranceChoice.query_age,
        query_province: this.state.insuranceChoice.query_province,
      },
    });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.text);

      const source = this.state.insuranceChoice.query_province === PROVINCE_CABA ?
        cabaInsuranceLocations : bsasInsuranceLocations;

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });

      return {}; // arrow function needs a return value
    }, 300);
  };

  popUpMoreInfoCardTrigger = () => (
    <span>Ver más información<Icon name="info circle" /></span>
  );

  dangerousHTMLQuoteDetails = moreInfo =>
    <div dangerouslySetInnerHTML={{ __html: moreInfo }} />

  popUpMoreInfo(quote) {
    return (
      <Popup trigger={this.popUpMoreInfoCardTrigger()}>
        <Popup.Header>{quote.policy}</Popup.Header>
        <Popup.Content>
          {this.dangerousHTMLQuoteDetails(quote.moreInfo)}
        </Popup.Content>
      </Popup>
    );
  }

  cardInsuranceQuote(quote) {
    return (
      <Card key={quote.policyId}>
        <Card.Content textAlign="center">
          <Image src={quote.brokerLogo} />
          <Card.Description>{quote.policy}</Card.Description>
          <Card.Meta>{this.popUpMoreInfo(quote)}</Card.Meta>
        </Card.Content>
        <Card.Content className="btn-displaced-container txt-center">
          <div className="fs-big txt-dark-gray txt-center">$<span className="fw-bold fs-big">{quote.price}</span>/
            mes
          </div>
          <Button
            primary
            className="btn-displaced"
            onClick={() => {
                    this.props.selectInsurance(
                      quote,
                      this.state.optInOrOut,
                      this.state.insuranceChoice,
                      this.props.lead,
                    );
            }}
          >
            Elegir
          </Button>
        </Card.Content>
      </Card>
    );
  }

  render() {
    const error = Object.values(this.state.errors).some(Boolean);

    const { isLoading, value, results } = this.state;

    let quotesList;
    if (this.state.hasSearchedHeroInsurance && this.state.insuranceQuotes.length > 0) {
      const quoteItems =
            this.state.insuranceQuotes.map(quote => (this.cardInsuranceQuote(quote)));
      quotesList = (
        <div className="margin-bottom">
          <Divider />
          <Card.Group centered>
            {quoteItems}
          </Card.Group>
        </div>
      );
    } else if (this.state.hasSearchedHeroInsurance && this.state.insuranceQuotes.length === 0) {
      quotesList = (
        <div className="margin-bottom txt-center">
          <Divider />
          <Message negative>
            <Message.Header>
              <span>No se encontraron resultados</span>
            </Message.Header>
          </Message>
        </div>
      );
    }

    let heroQuery;
    if (this.state.optInOrOut === HERO_INSURANCE) {
      heroQuery = (
        <Segment attached padded>
          <Form onSubmit={this.getQuote} error={error}>
            <Form.Group widths="equal">
              <Form.Select
                search
                required
                label="Provincia"
                name="query_province"
                options={[{ value: PROVINCE_CABA, text: PROVINCE_CABA },
                  { value: PROVINCE_BSAS, text: PROVINCE_BSAS }]}
                value={this.state.insuranceChoice.query_province}
                error={this.state.errors.query_province}
                onChange={this.handleDropdownChange}
                placeholder="Provincia"
              />
              <Form.Field required>
                <label>Código Postal</label>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  minCharacters={3}
                  required
                  noResultsMessage="No se encuentran resultados"
                  results={results}
                  value={value.title}
                  placeholder="Código Postal"
                />
              </Form.Field>
              <Form.Input
                fluid
                required
                label="Edad"
                type="number"
                min={18}
                max={99}
                name="query_age"
                value={this.state.insuranceChoice.query_age}
                error={this.state.errors.query_age}
                onChange={this.handleHeroInsuranceDataChange}
                placeholder="Edad"
              />
            </Form.Group>
            <div className="txt-center">
              <Button size="large" primary type="submit" >Cotizar</Button>
              <Button onClick={() => {
                        this.props.backToDashboard();
                      }}
              >Volver
              </Button>
            </div>
          </Form>
          {quotesList}
          <Divider />
          <p className="txt-med-gray txt-center fs-large">Al momento de concretar la compra te pediremos más datos para
            completar el seguro de tu moto
          </p>
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
        <p className="fs-huge txt-med-gray txt-center">Asegurá tu moto con la prestadora que te sea mas
          conveniente, <br /> nosotros nos ocupamos del papeleo.
        </p>
        <Card className="page-column-card">
          <Form.Select
            fluid
            options={optInOrOutOptions}
            name="optInOrOut"
            value={this.state.optInOrOut}
            onChange={this.handleDropdownOptInOrOutChange}
            className="fs-big"
          />
          {heroQuery}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  lead: store.main.lead,
  insuranceChoice: store.main.insuranceChoice,
});

const mapDispatchToProps = dispatch => ({
  backToDashboard: () => {
    dispatch(push('/dashboard'));
  },
  selectMyOwnInsurance: async (lead) => {
    const body = {
      insurance_choice: {
        opt_in_or_out: PERSONAL_INSURANCE,
        motorcycle_id: lead.motorcycle.id,
        query_province: PROVINCE_CABA,
        query_postal_code: '',
        query_age: 18,
      },
    };
    axios.post(
      `/api/leads/${lead.id}/insurance`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceOptOut());
      dispatch(push('/dashboard'));
      dispatch(insuranceChoiceFetched(body.insurance_choice));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
  selectInsurance: async (quote, optInOrOut, insuranceChoice, lead) => {
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
        query_postal_code: insuranceChoice.query_postal_code,
        query_age: insuranceChoice.query_age,
        query_province: insuranceChoice.query_province,
      },
    };

    axios.post(
      `/api/leads/${lead.id}/insurance`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(insuranceSelected(quote, insuranceChoice));
      dispatch(push('/dashboard'));
      dispatch(insuranceChoiceFetched(body.insurance_choice));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
});

export default translate('insurance')(connect(mapStateToProps, mapDispatchToProps)(InsurancePage));
