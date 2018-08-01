import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';

import { Button, Form, Card, Divider, Image } from 'semantic-ui-react';
import Slider from 'react-slick';

import { insuranceSelected, insuranceOptOut } from '../../actions/insuranceChoices';

import { PROVINCE_CABA, PROVINCE_BSAS } from './constants';
import { cabaInsuranceLocations, bsasInsuranceLocations } from './insuranceLocations';

const PERSONAL_INSURANCE = 'personalInsurance';
const HERO_INSURANCE = 'heroInsurance';

class InsurancePage extends Component {
  static propTypes = {
    selectInsurance: propTypes.func.isRequired,
    cancelQuote: propTypes.func.isRequired,
    selectMyOwnInsurance: propTypes.func.isRequired,
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      insuranceSelection: HERO_INSURANCE,
      insuranceQuotes: [],
      insurance: {
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
    axios.get(`api/leads/${this.props.user.id}/insurance/quote`, {
      params: this.state.insurance,
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

  handleInsuranceSelectionChange = (e, radio) => {
    const { value } = radio;
    this.setState({ insuranceSelection: value });
  };

  handleDropdownChange = (e, selectObj) => {
    const { name: inputName, value } = selectObj;
    const newData = this.state.insurance;
    newData[inputName] = value;
    this.setState({ insurance: newData });
  }

  handleHeroInsuranceDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.insurance;
    newData[inputName] = value;
    this.setState({ insurance: newData });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let quotesList;
    if (this.state.insuranceQuotes.length > 0) {
      const sliderSettings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              infinite: true,
            },
          },
        ],
      };
      const quoteItems =
            this.state.insuranceQuotes.map(broker =>
              broker.brokerQuotes.map(quote => (
                <div>
                  <Card className="carrousel-item">
                    <Image className="bike-image" src={broker.brokerLogo} />
                    <h2 className="bike-name">{broker.brokerName}</h2>
                    <h3>{quote.policy}</h3>
                    <Divider />
                    <div>
                      <ul>
                        {quote.moreInfo.map(moreInfo => (
                          <li>
                            {moreInfo}
                          </li>))}
                      </ul>
                    </div>
                    <Card.Content>
                      <Divider />
                      <p className="price">$<span className="price-number">{quote.price}</span>/ mes </p>
                      <Button
                        size="big"
                        primary
                        onClick={() => {
                              this.props.selectInsurance(
  quote,
                                this.state.insurance,
                                broker.brokerName,
                                broker.brokerLogo,
                                this.props.user.id,
  );
  }}
                      >Elegir
                      </Button>
                    </Card.Content>
                  </Card>
                </div>)));
      quotesList = (
        <div>
          <Slider {...sliderSettings}>
            {quoteItems}
          </Slider>
        </div>
      );
    }
    let heroInsuranceForm;
    if (this.state.insuranceSelection === HERO_INSURANCE) {
      heroInsuranceForm = (
        <div>
          <Form.Group widths="equal">
            <Form.Select
              search
              required
              label="Provincia"
              name="province"
              options={[{ value: PROVINCE_CABA, text: PROVINCE_CABA },
                { value: PROVINCE_BSAS, text: PROVINCE_BSAS }]}
              value={this.state.insurance.province}
              error={this.state.errors.province}
              onChange={this.handleDropdownChange}
              placeholder="Provincia"
            />
            <Form.Select
              search
              required
              label="Código postal"
              name="postalCode"
              options={this.state.insurance.province === PROVINCE_CABA ?
                cabaInsuranceLocations : bsasInsuranceLocations}
              value={this.state.insurance.postalCode}
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
              value={this.state.insurance.age}
              error={this.state.errors.age}
              onChange={this.handleHeroInsuranceDataChange}
            />
            <Button primary onClick={this.getQuote}>Cotizar</Button>
          </Form.Group>
          {quotesList}
          <Button onClick={() => {
                    this.props.cancelQuote();
                  }}
          >Cancelar
          </Button>
        </div>);
    } else {
      heroInsuranceForm = (
        <Button
          primary
          onClick={() => {
                  this.props.selectMyOwnInsurance(this.props.user.id);
                }}
        >Continuar
        </Button>
      );
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={error}>
          <Form.Group widths="equal">
            <Form.Field>
                ¿Como queres asegurarte?
            </Form.Field>
            <Form.Radio
              label="Quiero cotizar mi seguro con Hero"
              name="insuranceSelection"
              value={HERO_INSURANCE}
              checked={this.state.insuranceSelection === HERO_INSURANCE}
              onChange={this.handleInsuranceSelectionChange}
            />
            <Form.Radio
              label="Voy a contratar mi propio seguro"
              name="insuranceSelection"
              value={PERSONAL_INSURANCE}
              checked={this.state.insuranceSelection === PERSONAL_INSURANCE}
              onChange={this.handleInsuranceSelectionChange}
            />
          </Form.Group>
          {heroInsuranceForm}
        </Form>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  user: store.main.user,
});

const mapDispatchToProps = dispatch => ({
  cancelQuote: () => {
    dispatch(push('/dashboard'));
  },
  selectMyOwnInsurance: async (userId) => {
    axios.post(
      `/api/leads/${userId}/insurance/opt-out`,
      {
        user: userId,
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
  selectInsurance: async (quote, insurance, brokerName, brokerLogo, userId) => {
    axios.post(
      `/api/leads/${userId}/insurance/quote`,
      {
        user: userId,
        quote: {
          id: quote.id,
          price: quote.price,
          broker: brokerName,
        },
        insurance,
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

