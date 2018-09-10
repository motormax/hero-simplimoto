import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Button, Form, Message, Card, Segment } from 'semantic-ui-react';
import axios from 'axios';
import humps from 'humps';
import moment from 'moment';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
import { dateAppointmentFetched } from '../actions/dateAppointments';
import AddressSearchInput from './DeliveryPage/AddressSearchInput';
import AddressGoogleMap from './DeliveryPage/AddressGoogleMap';

export const MORNING = 'morning';
export const AFTERNOON = 'afternoon';
export const EVENING = 'evening';

export const shiftOptions = [
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
    lead: propTypes.shape({
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
      name: '',
      email: '',
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
        name: false,
        email: false,
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
    if (this.state.address.telephoneNumber.length < 6) {
      const newErrors = this.state.errors;
      newErrors.telephoneNumber = true;
      newErrors.description = 'Introducí un teléfono válido.';
      this.setState({ errors: newErrors });
      return;
    }
    this.sendDateYourBikeData();
  };

  sendDateYourBikeData = async () => {
    const dateAppointment = {};
    dateAppointment.shift = this.state.shift;
    dateAppointment.date = moment(this.state.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    dateAppointment.lead_id = this.props.lead.id;
    dateAppointment.name = this.state.name;
    dateAppointment.email = this.state.email;
    dateAppointment.address = humps.decamelizeKeys(this.state.address);
    try {
      await this.props.submitDateAppointment(this.props.lead.id, dateAppointment);
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
      <Segment className="not-border-bottom" attached>
        <p className="txt-dark-gray fw-bold fs-huge">Fecha de la cita</p>

        <Form.Field>
          <label htmlFor="date">Fecha</label>
          <DateInput
            fluid
            required
            // minDate={moment().add(1, 'days')}
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </Form.Field>

        <Form.Field>
          <Form.Select
            fluid
            required
            label="Momento del día"
            name="shift"
            options={shiftOptions}
            value={this.state.shift}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Segment>
    );

    const addressFormGroup = (
      <Segment attached>
        <p className="txt-dark-gray fw-bold fs-huge">Dónde se van a encontrar</p>

        <Form.Group>
          <AddressSearchInput
            value={this.state.address.street}
            onAddressChange={this.handleStreetChange}
            onGeocodeLocationChange={this.handleGeocodeLocationChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
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
            label="Celular"
            type="text"
            name="telephoneNumber"
            value={this.state.address.telephoneNumber}
            error={this.state.errors.telephoneNumber}
            onChange={this.handleAddressDataChange}
          />
        </Form.Group>
      </Segment>
    );

    const leadDataFormGroup = (
      <Segment attached>
        <p className="txt-dark-gray fw-bold fs-huge">Quién la va a recibir</p>

        <Form.Group widths="equal">
          <Form.Input
            fluid
            required
            label="Nombre"
            type="text"
            name="name"
            value={this.state.name}
            error={this.state.errors.name}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            required
            label="Mail"
            type="email"
            name="email"
            value={this.state.email}
            error={this.state.errors.email}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Segment>
    );

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Arreglá una cita</h2>
        <p className="fs-huge txt-med-gray txt-center">¡Conocé la moto que querés en donde quieras!</p>
        <Card className="page-column-card">
          <Form onSubmit={this.handleSubmit} error={error}>
            {dateFormGroup}
            {leadDataFormGroup}
            {addressFormGroup}
            <Message
              error
              header="Error"
              content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
            />
            <AddressGoogleMap
              ref={this.addressMap}
              onPickupLocationChange={this.handlePickupLocationChange}
            />
            <Segment className="txt-center" attached="bottom">
              <Button size="big" type="submit" primary>Confirmar</Button>
            </Segment>
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
  submitDateAppointment: async (leadId, dateAppointment) => {
    const { data: { data: newDateAppointment } } = await axios.post(`/api/leads/${leadId}/date_appointment`, { date_appointment: dateAppointment });
    dispatch(dateAppointmentFetched(newDateAppointment));
    dispatch(push('/dashboard'));
  },
});

export default translate('dateYourBike')(connect(mapStateToProps, mapDispatchToProps)(DateYourBikePage));
