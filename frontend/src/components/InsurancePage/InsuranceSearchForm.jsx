import React from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';

import { PROVINCE_CABA, PROVINCE_BSAS } from './constants';
import { cabaInsuranceLocations, bsasInsuranceLocations } from './insuranceLocations';

class InsuranceSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      axios.get('api/insurance/quote', {
        params: this.state.insurance,
      })
        .then((response) => {
          console.log(response); // eslint-disable-line no-console
          // this.setState({ insuranceQuotes: response.data.data });
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
        })
        .then(() => {
          // always executed
        });
    };

    render() {
      return (
        <Form.Group widths="equal">
          <Form.Select
            search
            required
            label="Provincia"
            name="province"
            options={[
              { value: PROVINCE_CABA, text: PROVINCE_CABA },
              { value: PROVINCE_BSAS, text: PROVINCE_BSAS },
            ]}
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
              cabaInsuranceLocations :
              bsasInsuranceLocations}
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
          <Button onClick={this.getQuote}>Cotizar</Button>
        </Form.Group>
      );
    }
}

export default InsuranceSearchForm;
