import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import humps from 'humps';
import moment from 'moment';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
import { dateAppointmentFetched } from '../actions/dateAppointments';
import AddressSearchInput from './DeliveryPage/AddressSearchInput';
import AddressGoogleMap from './DeliveryPage/AddressGoogleMap';

const MORNING = 'morning';
const AFTERNOON = 'afternoon';
const EVENING = 'evening';

const shiftOptions = [
  {
    key: MORNING,
    text: 'Por la mañana (9 a 12)',
    value: MORNING,
  },
  {
    key: AFTERNOON,
    text: 'Por la tarde (12 a 18)',
    value: AFTERNOON,
  },
  {
    key: EVENING,
    text: 'Por la noche (18 a 22)',
    value: EVENING,
  },
];

class DateYourBikePage extends Component {
  static propTypes = {
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    submitDateAppointment: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.addressMap = React.createRef();
    this.state = {
      shift: MORNING,
      date: '',
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
        date: false,
        shift: false,
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
    this.sendDateYourBikeData();
  };

  sendDateYourBikeData = async () => {
    const dateAppointment = {};
    dateAppointment.shift = this.state.shift;
    dateAppointment.date = moment(this.state.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    dateAppointment.user_id = this.props.user.id;
    dateAppointment.address = humps.decamelizeKeys(this.state.address);
    try {
      await this.props.submitDateAppointment(this.props.user.id, dateAppointment);
      console.log('Datos cargados correctamente'); // eslint-disable-line no-console
    } catch (error) {
      // TODO: handle specific input validation errors
      const newErrors = this.state.errors;
      newErrors.general = true;
      newErrors.description = error.message;
      this.setState({ errors: newErrors });
    }
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleAddressDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newAddressData = this.state.address;
    newAddressData[inputName] = value;
    this.setState({ address: newAddressData });
  };

  handleStreetChange = (street) => {
    const newAddressData = this.state.address;
    newAddressData.street = street;
    this.setState({ address: newAddressData });
  };

  handleGeocodeLocationChange = (latitude, longitude) => {
    this.addressMap.current.changeDeliveryGeolocation(latitude, longitude);
  };

  handlePickupLocationChange = (e, { value }) => {
    const newAddressData = this.state.address;
    newAddressData.street = value;
    this.setState({ address: newAddressData });
    this.addressMap.current.changePickupLocation(value);
  };


  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);
    const dateFormGroup = (
      <Form.Group widths="equal">
        <DateInput
          required
          closable
          // minDate={moment().add(1, 'days')}
          label="Día"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <Form.Select
          fluid
          required
          name="shift"
          options={shiftOptions}
          value={this.state.shift}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
    const addressFormGroup = (
      <Form.Group widths="equal">
        <AddressSearchInput
          value={this.state.address.street}
          onAddressChange={this.handleStreetChange}
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
          onChange={this.handleAddressDataChange}
        />
        <Form.Input
          fluid
          required
          label="Código postal"
          type="text"
          name="postalCode"
          value={this.state.address.postalCode}
          error={this.state.errors.postalCode}
          onChange={this.handleAddressDataChange}
        />
        <Form.Input
          fluid
          required
          label="Teléfono"
          type="text"
          name="telephoneNumber"
          value={this.state.address.telephoneNumber}
          error={this.state.errors.telephoneNumber}
          onChange={this.handleAddressDataChange}
        />
      </Form.Group>);
    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={error}>
          {dateFormGroup}
          {addressFormGroup}
          <Message
            error
            header="Error"
            content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
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

const mapDispatchToProps = dispatch => ({
  submitDateAppointment: async (userId, dateAppointment) => {
    const { data: { data: newDateAppointment } } = await axios.post(`/api/users/${userId}/date_appointment`, { date_appointment: dateAppointment });
    dispatch(dateAppointmentFetched(newDateAppointment));
    dispatch(push('/dashboard'));
  },
});

export default translate('dateYourBike')(connect(mapStateToProps, mapDispatchToProps)(DateYourBikePage));
