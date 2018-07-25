import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import axios from 'axios';
import humps from 'humps';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class PlateRegistrationSection extends Component {
  static propTypes = {
    submitPlateRegistrationData: propTypes.func.isRequired,
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.addressMap = React.createRef();
    this.state = {
      email: '',
      phone: '',
      personalData: {
        dni: '',
        name: '',
        lastName: '',
      },
      address: {
        street: '',
        number: '',
        town: '',
        complements: '',
        postalCode: '',
        telephoneNumber: '',
      },
      frontDniImage: '',
      backDniImage: '',
      errors: {
        general: false,
        shift: false,
        street: false,
        number: false,
        town: false,
        complements: false,
        postalCode: false,
        telephoneNumber: false,
        description: '',
        frontDniImage: false,
        backDniImage: false,
        dni: false,
        name: false,
        lastName: false,
        email: false,
        phone: false,
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.sendPlateRegistrationData();
  };

  sendPlateRegistrationData = async () => {
    const body = {
      plate_registration_data: {
        email: '',
        phone: '',
        personal_data: {
          dni: '',
          name: '',
          last_name: '',
        },
        address: {
          street: '',
          number: '',
          town: '',
          complements: '',
          postalCode: '',
          telephoneNumber: '',
        },
        front_dni_image: {
          data: 'YW5vdGhlciBpbWFnZQ==',
          name: 'front dni page',
          type: 'none',
        },
        back_dni_image: {
          data: 'YW5vdGhlciBpbWFnZQ==',
          name: 'back dni page',
          type: 'none',
        },
      },
    };
    body.plate_registration_data.email = this.state.email;
    body.plate_registration_data.phone = this.state.phone;

    // a corregir
    this.state.address.telephoneNumber = this.state.phone;

    body.plate_registration_data.personal_data = humps.decamelizeKeys(this.state.personalData);
    body.plate_registration_data.address = humps.decamelizeKeys(this.state.address);
    body.plate_registration_data.lead_id = this.props.user.id;

    // a corregir
    body.plate_registration_data.address.telephone_phone = this.state.phone;
    this.state.frontDniImage = '1';
    this.state.backDniImage = '1';

    try {
      await this.props.submitPlateRegistrationData(this.props.user.id, body);
    } catch (error) {
      // TODO: handle specific input validation errors
      const newErrors = this.state.errors;
      newErrors.general = true;
      newErrors.description = error.response.data;
      this.setState({ errors: newErrors });
    }

    /* const url = `api/leads/${this.props.lead.id}/plate_registration/`;
    axios.post(url, body)
      .then(() => {
        console.log('Datos cargados correctamente'); // eslint-disable-line no-console
        // this.props.history.push('/dashboard'); // dispatch.push
      })
      .catch((error) => {
        // TODO: handle specific input validation errors
        const newErrors = this.state.errors;
        newErrors.general = true;
        newErrors.description = error.message;
        this.setState({ errors: newErrors });
      }); */
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

  handlePersonalDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newPersonalData = this.state.personalData;
    newPersonalData[inputName] = value;
    this.setState({ address: newPersonalData });
  };

  handleEmailChange = (event) => {
    const { value } = event.target;
    let newEmail = this.state.email;
    newEmail = value;
    this.setState({ address: newEmail });
  };

  handlePhoneChange = (event) => {
    const { value } = event.target;
    let newPhone = this.state.phone;
    newPhone = value;
    this.setState({ address: newPhone });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);
    const personalDataFormGroup = (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          required
          label="Nombre"
          type="text"
          name="name"
          value={this.state.personalData.name}
          error={this.state.errors.name}
          onChange={this.handlePersonalDataChange}
        />
        <Form.Input
          fluid
          required
          label="Apellido"
          type="text"
          name="lastName"
          value={this.state.personalData.lastName}
          error={this.state.errors.lastName}
          onChange={this.handlePersonalDataChange}
        />
        <Form.Input
          fluid
          required
          label="DNI"
          type="text"
          name="dni"
          value={this.state.personalData.dni}
          error={this.state.errors.dni}
          onChange={this.handlePersonalDataChange}
        />
      </Form.Group>);
    const addressFormGroup = (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          required
          label="Dirreccón"
          type="text"
          name="street"
          value={this.state.address.street}
          error={this.state.errors.street}
          onChange={this.handleAddressDataChange}
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
      </Form.Group>);
    const lastFieldsFormGroup = (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          required
          label="Email"
          type="text"
          name="email"
          value={this.state.email}
          error={this.state.errors.email}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          required
          label="Teléfono NOP"
          type="text"
          name="phone"
          value={this.state.phone}
          error={this.state.errors.phone}
          onChange={this.handleChange}
        />
      </Form.Group>);
      /*
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
      */
    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={error}>
          {personalDataFormGroup}
          {addressFormGroup}
          {lastFieldsFormGroup}
          <Message
            error
            header="Error"
            content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
          />
          <Button type="submit">
            Guardar
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.main.user,
});

const mapDispatchToProps = dispatch => ({
  submitPlateRegistrationData: async (leadId, plateRegistrationData) => {
    await axios.post(`/api/leads/${leadId}/plate_registration/`, plateRegistrationData);
    dispatch(push('/dashboard'));
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationSection));
