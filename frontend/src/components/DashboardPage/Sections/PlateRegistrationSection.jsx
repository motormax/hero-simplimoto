/* global FileReader */
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
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
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
      frontDniImage: {
        data: '',
        name: '',
        type: '',
      },
      backDniImage: {
        data: '',
        name: '',
        type: '',
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
          data: '',
          name: '',
          type: '',
        },
        back_dni_image: {
          data: '',
          name: '',
          type: '',
        },
      },
    };
    body.plate_registration_data.email = this.state.email;
    body.plate_registration_data.phone = this.state.phone;

    // The Address model has a telephone number but also PlateRegistrationData
    this.state.address.telephoneNumber = this.state.phone;

    body.plate_registration_data.personal_data = humps.decamelizeKeys(this.state.personalData);
    body.plate_registration_data.address = humps.decamelizeKeys(this.state.address);
    body.plate_registration_data.front_dni_image.data = this.state.frontDniImage.data;
    body.plate_registration_data.front_dni_image.name = this.state.frontDniImage.name;
    body.plate_registration_data.front_dni_image.type = this.state.frontDniImage.type;
    body.plate_registration_data.back_dni_image.data = this.state.backDniImage.data;
    body.plate_registration_data.back_dni_image.name = this.state.backDniImage.name;
    body.plate_registration_data.back_dni_image.type = this.state.backDniImage.type;

    try {
      await this.props.submitPlateRegistrationData(this.props.lead.id, body);
    } catch (error) {
      // TODO: handle specific input validation errors
      const newErrors = this.state.errors;
      newErrors.general = true;
      newErrors.description = error.response.data;
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

  handleFrontDniImageChange = async (event) => {
    const frontDniImage = await this.imageToBase64AndChange(event);
    this.setState({ frontDniImage });
  };

  handleBackDniImageChange = async (event) => {
    const backDniImage = await this.imageToBase64AndChange(event);
    this.setState({ backDniImage });
  };

  imageToBase64AndChange = event => new Promise((resolve, reject) => {
    const selectedFile = event.target.files;
    let file = '';
    let fileName = '';
    let fileType = '';

    // Check if File is not empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      const fileToLoad = selectedFile[0];
      fileName = fileToLoad.name;
      fileType = fileToLoad.type;
      // FileReader function for read the file
      const fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = (fileLoadedEvent) => {
        file = fileLoadedEvent.target.result;
        resolve({
          data: file,
          name: fileName,
          type: fileType,
        });
      };
      fileReader.onerror = reject;

      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  });

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
          label="Teléfono"
          type="text"
          name="phone"
          value={this.state.phone}
          error={this.state.errors.phone}
          onChange={this.handleChange}
        />
      </Form.Group>);
    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={error}>
          {personalDataFormGroup}
          {addressFormGroup}
          {lastFieldsFormGroup}
          <Form.Field>
            <div className="required field">
              <label htmlFor="frontDni">Imagen frontal DNI</label>
              <input type="file" id="frontDni" onChange={this.handleFrontDniImageChange} />
            </div>
            <div className="required field">
              <label htmlFor="backDni">Imagen trasera DNI</label>
              <input type="file" id="backDni" onChange={this.handleBackDniImageChange} />
            </div>
          </Form.Field>
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
  lead: store.main.lead,
});

const mapDispatchToProps = dispatch => ({
  submitPlateRegistrationData: async (leadId, plateRegistrationData) => {
    await axios.post(`/api/leads/${leadId}/plate_registration/`, plateRegistrationData);
    dispatch(push('/dashboard'));
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationSection));
