import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';

import axios from 'axios';
import humps from 'humps';
import pickupLocations from './Delivery/pickupLocations';

const deliveryMethods = [
  {
    key: 'delivery',
    text: 'Quiero que me envíen la moto',
    value: 'delivery',
  },
  {
    key: 'pickup',
    text: 'Quiero retirar la moto por un concesionario',
    value: 'pickup',
  },
];


class DeliverySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDeliveryMethod: 'delivery',
      chosenPickupLocation: '',
      deliveryData: {
        address: '',
        town: '',
        postalCode: '',
        telephoneNumber: '',
      },
      errors: {
        general: false,
        address: false,
        town: false,
        postalCode: false,
        telephoneNumber: false,
        description: '',
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.chosenDeliveryMethod === 'delivery') {
      this.sendDeliveryData();
    } else {
      // TODO: persist data on Redux and set Delivery stage as complete on Dashboard
      alert('Datos cargados correctamente.');
    }
  };

  sendDeliveryData = () => {
    const body = { delivery_data: humps.decamelizeKeys(this.state.deliveryData) };
    axios.post('api/delivery_data', body)
      .then(() => {
        // TODO: persist data on Redux and set Delivery stage as complete on Dashboard
        alert('Datos cargados correctamente.');
      })
      .catch((error) => {
        // TODO: handle specific input validation errors
        const newErrors = this.state.errors;
        newErrors.general = true;
        newErrors.description = error.response.data;
        this.setState({ errors: newErrors });
      });
  };

  handleDeliveryDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.deliveryData;
    newData[inputName] = value;
    this.setState({ deliveryData: newData });
  };

  handleDeliveryMethodChange = (e, { value }) => {
    this.setState({ chosenDeliveryMethod: value });
  };

  handlePickupLocationChange = (e, { value }) => {
    this.setState({ chosenPickupLocation: value });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let formGroup;
    if (this.state.chosenDeliveryMethod === 'delivery') {
      formGroup = (
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required
            label="Dirección"
            type="text"
            name="address"
            value={this.state.deliveryData.address}
            error={this.state.errors.address}
            onChange={this.handleDeliveryDataChange}
          />
          <Form.Input
            fluid
            required
            label="Localidad"
            type="text"
            name="town"
            value={this.state.deliveryData.town}
            error={this.state.errors.town}
            onChange={this.handleDeliveryDataChange}
          />
          <Form.Input
            fluid
            required
            label="Código postal"
            type="text"
            name="postalCode"
            value={this.state.deliveryData.postalCode}
            error={this.state.errors.postalCode}
            onChange={this.handleDeliveryDataChange}
          />
          <Form.Input
            fluid
            required
            label="Teléfono"
            type="text"
            name="telephoneNumber"
            value={this.state.deliveryData.telephoneNumber}
            error={this.state.errors.telephoneNumber}
            onChange={this.handleDeliveryDataChange}
          />
        </Form.Group>);
    } else {
      formGroup = (
        <Form.Select
          search
          options={pickupLocations}
          value={this.state.chosenPickupLocation}
          onChange={this.handlePickupLocationChange}
          placeholder="Elegí tu concesionaria más cercana"
        />
      );
    }
    return (
      <Form onSubmit={this.handleSubmit} error={error}>
        <Form.Select
          fluid
          options={deliveryMethods}
          value={this.state.chosenDeliveryMethod}
          onChange={this.handleDeliveryMethodChange}
        />
        {formGroup}
        <Message
          error
          header="Error"
          content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
        />
        <Button type="submit">Continuar</Button>
      </Form>
    );
  }
}

export default translate('delivery')(DeliverySection);
