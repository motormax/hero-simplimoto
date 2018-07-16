import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import humps from 'humps';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import pickupLocations from './Delivery/pickupLocations';
import AddressSearchInput from './Delivery/AddressSearchInput';
import AddressGoogleMap from './Delivery/AddressGoogleMap';

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
  static propTypes = {
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.addressMap = React.createRef();
    this.state = {
      chosenDeliveryMethod: 'delivery',
      chosenPickupLocation: '',
      address: {
        street: '',
        number: '',
        town: '',
        complements: '',
        postalCode: '',
        telephoneNumber: '',
      },
      errors: {
        general: false,
        street: false,
        number: false,
        town: false,
        complements: false,
        postalCode: false,
        telephoneNumber: false,
        description: '',
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.sendDeliveryData();
    // TODO: persist data on Redux and set Delivery stage as complete on Dashboard
    console.log('Datos cargados correctamente'); // eslint-disable-line no-console
  };

  sendDeliveryData = () => {
    const body = {};
    if (this.state.chosenDeliveryMethod === 'delivery') {
      body.delivery_choice = {
        address: humps.decamelizeKeys(this.state.address),
      };
    }
    if (this.state.chosenDeliveryMethod === 'pickup') {
      body.delivery_choice = {
        pickup_location: this.state.chosenPickupLocation,
      };
    }
    body.delivery_choice.user_id = this.props.user.id;
    axios.post('api/delivery_choices', body)
      .then(() => {
        // TODO: persist data on Redux and set Delivery stage as complete on Dashboard
        console.log('Datos cargados correctamente'); // eslint-disable-line no-console
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
    const newData = this.state.address;
    newData[inputName] = value;
    this.setState({ address: newData });
  };

  handleAddressDataChange = (street) => {
    const newData = this.state.address;
    newData.street = street;
    this.setState({ address: newData });
  };

  handleDeliveryMethodChange = (e, { value }) => {
    this.setState({ chosenDeliveryMethod: value });
    this.addressMap.current.cleanMarkers();

    if (value === 'pickup') {
      this.addressMap.current.showPickupMarkers();
    } else {
      this.addressMap.current.reset(this.state.address.street);
    }
  };

  handleGeocodeLocationChange = (latitude, longitude) => {
    this.addressMap.current.changeDeliveryGeolocation(latitude, longitude);
  };

  handlePickupLocationChange = (e, { value }) => {
    this.setState({ chosenPickupLocation: value });
    this.addressMap.current.changePickupLocation(value);
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    let formGroup;
    if (this.state.chosenDeliveryMethod === 'delivery') {
      formGroup = (
        <Form.Group widths="equal">
          <AddressSearchInput
            value={this.state.address.street}
            onAddressChange={this.handleAddressDataChange}
            onGeocodeLocationChange={this.handleGeocodeLocationChange}
          />
          <Form.Input
            fluid
            required
            label="Piso/Depto"
            type="text"
            name="complements"
            value={this.state.address.complements}
            error={this.state.errors.complements}
            onChange={this.handleDeliveryDataChange}
          />
          <Form.Input
            fluid
            required
            label="Código postal"
            type="text"
            name="postalCode"
            value={this.state.address.postalCode}
            error={this.state.errors.postalCode}
            onChange={this.handleDeliveryDataChange}
          />
          <Form.Input
            fluid
            required
            label="Teléfono"
            type="text"
            name="telephoneNumber"
            value={this.state.address.telephoneNumber}
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
      <div>
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
            content={'Hubo un error al procesar la solicitud. '.concat(
              this.state.errors.description)}
          />
          <Button type="submit">Continuar</Button>
        </Form>
        <AddressGoogleMap
          ref={this.addressMap}
          onPickupLocationChange={this.handlePickupLocationChange}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.main.user,
});

export default translate('delivery')(connect(mapStateToProps)(DeliverySection));
