/* eslint react/no-danger: 0 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import humps from 'humps';
import { push } from 'react-router-redux';
import { Button, Form, Card, Divider, Image, Segment, Icon, Popup, Message } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { insuranceChoiceFetched } from '../../actions/insuranceChoices';
import { PROVINCE_CABA, PROVINCE_BSAS, PERSONAL_INSURANCE, HERO_INSURANCE } from './constants';

const optInOrOutOptions = [
  {
    key: HERO_INSURANCE,
    text: 'Quiero cotizar mi seguro con Hero',
    value: HERO_INSURANCE,
  },
  {
    key: PERSONAL_INSURANCE,
    text: 'Voy a contratar mi propio seguro',
    value: PERSONAL_INSURANCE,
  },
];

const InsuranceOption = ({ option, issuerOptions }) => {
  const currentOption = issuerOptions.find(opt => opt.cobertura_id === option.id);
  if (currentOption) {
    return (
      <td
        style={
          {
            border: '1px solid #ddd',
            width: '20%',
            fontSize: '19px',
            fontWeight: 500,
            verticalAlign: 'middle',
          }
        }
      >
        ${currentOption.premio}
      </td>
    );
  }
  return (
    <td
      style={
        {
          border: '1px solid #ddd',
          width: '20%',
          fontSize: '19px',
          fontWeight: 500,
          verticalAlign: 'middle',
        }
      }
    >
      X
    </td>
  );
};

const InsurancesGrid = ({ options: issuers }) => {
  // XXX: Let's assume there's five of them
  const knownOptions = [
    { id: 339, title: 'Responsabilidad Civil' },
    { id: 340, title: 'Robo Clasico' },
    { id: 341, title: 'Robo Premium' },
  ];

  const images = {
    mapfre: 'https://www.123seguro.com/images/front/table/mapfre.png',
    libra: 'https://4.bp.blogspot.com/-EbhruQjEDLo/WnRQeldOIaI/AAAAAAAABiE/zDmWBehmIOY7NzyL_kd25IgUHdYTqYSbQCLcBGAs/s400/libra.png',
    atm: 'https://www.atmseguros.com.ar/newsitedev/wp-content/uploads/2018/06/logo-atm-.png',
  };

  return (
    <table
      style={
        {
          border: '1px solid #ddd',
          borderCollapse: 'collapse',
          borderSpacing: 0,
          width: '100%',
          verticalAlign: 'middle',
          lineHeight: 1,
          textAlign: 'center',
        }
      }
      cellPadding={0}
      cellSpacing={0}
    >
      <thead>
        <tr style={{ height: 60 }}>
          <th
            style={
              {
                background: '#f4f4f4',
                verticalAlign: 'middle',
                borderTop: '1px solid #ddd',
              }
            }
          />
          {knownOptions.map((option, idx) =>
            (
              <td
                key={idx}
                style={
                  {
                    border: '1px solid #ddd',
                    width: '20%',
                    // fontSize: "19px",
                    // fontWeight: 500,
                    verticalAlign: 'middle',
                    color: '#333',
                    fontWeight: '400',
                    fontSize: '13px',
                    minHeight: '70px',
                    padding: '0 5px',
                  }
                }
              >
                {option.title}
              </td>
            ))}
        </tr>
      </thead>
      <tbody>
        {
          issuers.map((issuer, idx) =>
            (
              <tr key={idx} style={{ height: 60 }}>
                <th style={{ border: '1px solid #ddd', height: 60, backgroundColor: '#f6f6f6' }}>
                  <img src={images[issuer.name]} alt={issuer.name} style={{ height: 60 }} />
                </th>
                {
                  knownOptions.map((option, idx) =>
                    <InsuranceOption key={idx} option={option} issuerOptions={issuer.coberturas} />)
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

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
      optInOrOut: propTypes.string,
      queryProvince: propTypes.string,
      queryPostalCode: propTypes.string,
      queryAge: propTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // insuranceQuotes: [],
      options: [],
      optInOrOut: props.insuranceChoice.optInOrOut || HERO_INSURANCE,
      insuranceChoice: {
        queryProvince: props.insuranceChoice.queryProvince || PROVINCE_CABA,
        queryPostalCode: props.insuranceChoice.queryPostalCode || '',
        queryAge: props.insuranceChoice.queryAge || 18,
      },
      hasSearchedHeroInsurance: false,
      errors: {
        queryProvince: false,
        queryPostalCode: false,
        queryAge: false,
      },
    };
  }

  getQuote = (event) => {
    event.preventDefault();
    axios.get(`api/leads/${this.props.lead.id}/insurance_quotes_v2`, {
      params: {
        // motorcycle_id: this.props.lead.motorcycle.id,
        motorcycle_id: 2443, // TODO: Apparently a Hunk 150 is a 2443, how should we know this?
        ...humps.decamelizeKeys(this.state.insuranceChoice),
      },
    })
      .then((response) => {
        console.log(response.data.data); // eslint-disable-line no-console
        const options = Object.keys(response.data.data)
          .map(insuranceName => ({ name: insuranceName, ...response.data.data[insuranceName] }));
        this.setState({
          // insuranceQuotes: response.data.data,
          options,
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
          <Image src={quote.brokerLogo} width="150px" height="55px" />
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
    const errorValues = Object.keys(this.state.errors).map(key => this.state.errors[key]);
    const error = errorValues.some(Boolean);

    let quotesList;
    if (this.state.hasSearchedHeroInsurance && this.state.options.length > 0) {
      quotesList = (
        <div className="margin-bottom">
          <Divider />
          <Card.Group centered>
            <InsurancesGrid options={this.state.options} />
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
          <p className="fs-big txt-med-gray txt-center"><b>YA ESTAMOS</b> en Capital Federal y Gran Buenos Aires.<br /><b>PROXIMAMENTE</b> en otras ciudades del país</p>
          <Form onSubmit={this.getQuote} error={error}>
            <Form.Group widths="equal">
              <Form.Select
                search
                required
                label="Provincia"
                name="queryProvince"
                options={[{ value: PROVINCE_CABA, text: PROVINCE_CABA },
                  { value: PROVINCE_BSAS, text: PROVINCE_BSAS }]}
                value={this.state.insuranceChoice.queryProvince}
                error={this.state.errors.queryProvince}
                onChange={this.handleDropdownChange}
                placeholder="Provincia"
              />
              <Form.Input
                fluid
                required
                label="Código Postal"
                width={20}
              >
                <MaskedInput
                  type="text"
                  length="4"
                  name="queryPostalCode"
                  value={this.state.insuranceChoice.queryPostalCode}
                  error={this.state.errors.queryPostalCode}
                  onChange={this.handleHeroInsuranceDataChange}
                  mask={[/\d/, /\d/, /\d/, /\d/]}
                  placeholder="Código Postal"
                />
              </Form.Input>
              <Form.Input
                fluid
                required
                label="Edad"
                type="number"
                min={18}
                max={99}
                name="queryAge"
                value={this.state.insuranceChoice.queryAge}
                error={this.state.errors.queryAge}
                onChange={this.handleHeroInsuranceDataChange}
                placeholder="Edad"
              />
            </Form.Group>
            <div className="txt-center">
              <Button size="large" primary type="submit" >Cotizar</Button>
              <Button
                size="medium"
                secondary
                className="btn-outline"
                onClick={() => {
                  this.props.backToDashboard();
                }}
              >
                <Icon name="chevron left" />
                Volver
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
          >Confirmar
          </Button>
          <Button
            size="large"
            secondary
            className="btn-outline"
            onClick={() => {
              this.props.backToDashboard();
            }}
          >
            <Icon name="chevron left" />
            Volver
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
      dispatch(push('/dashboard'));
      dispatch(insuranceChoiceFetched(humps.camelizeKeys(body.insurance_choice)));
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
        query_postal_code: insuranceChoice.queryPostalCode,
        query_age: insuranceChoice.queryAge,
        query_province: insuranceChoice.queryProvince,
      },
    };

    const response = await axios.post(`/api/leads/${lead.id}/insurance`, body);

    console.log(response); // eslint-disable-line no-console
    dispatch(push('/dashboard'));
    dispatch(insuranceChoiceFetched(humps.camelizeKeys(response.data.data)));
  },
});

export default translate('insurance')(connect(mapStateToProps, mapDispatchToProps)(InsurancePage));
