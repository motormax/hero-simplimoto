/* global FileReader */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Message, Grid, Card, Segment } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import dniImage from '../images/dni.svg';

import { PERSONAL_PLATE_REGISTRATION, HERO_PLATE_REGISTRATION } from './constants';

const plateRegistrationMethods = [
  {
    key: HERO_PLATE_REGISTRATION,
    text: 'Quiero que Hero patente mi moto',
    value: HERO_PLATE_REGISTRATION,
  },
  {
    key: PERSONAL_PLATE_REGISTRATION,
    text: 'Voy a realizar el patentamiento',
    value: PERSONAL_PLATE_REGISTRATION,
  },
];

class PlateRegistrationPage extends Component {
  static propTypes = {
    selectHeroPlateRegistration: propTypes.func.isRequired,
    selectMyOwnPlateRegistration: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    optInOrOut: propTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      optInOrOut: props.optInOrOut,
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
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handlePlateRegistrationMethodChange = (e, { value }) => {
    this.setState({ optInOrOut: value });
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
      <Form>
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
      </Form>);
    const addressFormGroup = (
      <Form>
        <Form.Input
          fluid
          required
          label="Dirección que aparece en el DNI"
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
      </Form>);
    const lastFieldsFormGroup = (
      <Form>
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
          label="Celular/Teléfono fijo"
          type="text"
          name="phone"
          value={this.state.phone}
          error={this.state.errors.phone}
          onChange={this.handleChange}
        />
      </Form>);

    let heroPlateRegistrationForm;
    if (this.state.optInOrOut === HERO_PLATE_REGISTRATION) {
      heroPlateRegistrationForm = (
        <React.Fragment>
          <Segment attached>
            <p className="fs-big fw-bold txt-dark-gray txt-center">
              Foto de tu Documento de Identidad de quién será propietario de la moto
            </p>
            <p className="fs-large txt-med-gray txt-center">
              Te vamos a pedir que le saques una foto a tu documento y
              la cargues con el siguiente botón.
            </p>

            <Grid>
              <Grid.Row centered>
                <Grid.Column width={7}>
                  <img src={dniImage} alt="" />
                </Grid.Column>
                <Grid.Column width={7}>
                  <div className="required field">
                    <label className="ui button primary btn-outline" htmlFor="frontDni">
                      <i className="upload icon" />
                      Imagen frontal DNI
                    </label>
                    <input type="file" id="frontDni" style={{ display: 'none' }} onChange={this.handleFrontDniImageChange} />
                    { this.state.frontDniImage.name ?
                      <div>{this.state.frontDniImage.name}</div> :
                      <div>Falta cargar imagen</div>
                    }
                  </div>
                  <div className="required field">
                    <label className="ui button primary btn-outline" htmlFor="backDni">
                      <i className="upload icon" />
                      Imagen trasera DNI
                    </label>
                    <input type="file" id="backDni" style={{ display: 'none' }} onChange={this.handleBackDniImageChange} />
                    { this.state.backDniImage.name ?
                      <div>{this.state.backDniImage.name}</div> :
                      <div>Falta cargar imagen</div>
                    }
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment attached>
            {personalDataFormGroup}
            {addressFormGroup}
            {lastFieldsFormGroup}
            <Message
              error
              header="Error"
              content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
            />
          </Segment>

          <Segment attached="bottom" className="txt-center">
            <Button
              size="big"
              primary
              onClick={() => {
                this.props.selectHeroPlateRegistration(
                  this.props.lead.id,
                  this.state.email,
                  this.state.phone,
                  this.state.personalData,
                  this.state.address,
                  this.state.frontDniImage,
                  this.state.backDniImage,
                );
              }}
            >Continuar
            </Button>
          </Segment>
        </React.Fragment>);
    } else {
      heroPlateRegistrationForm = (
        <Segment attached="bottom" className="txt-center">
          <Button
            size="big"
            primary
            onClick={() => {
              this.props.selectMyOwnPlateRegistration(this.props.lead.id);
            }}
          >Continuar
          </Button>
        </Segment>
      );
    }

    return (
      <div>
        <h2 className="fs-massive txt-dark-gray fw-bold txt-center">Patentamiento online</h2>
        <p className="fs-huge txt-med-gray txt-center">
          Para realizar el patentamiento necesitamos pedirte la información
          necesaria para realizar el trámite.
        </p>
        <p className="fs-big txt-dark-gray txt-center">
          El patentamiento tiene un costo de AR$ <span className="fw-bold">3,800</span> que se
          incorporan a la financiación. El tramite lo gestionará <span className="fw-bold">integramente</span> Hero, y solo se requerirá una
          <span className="fw-bold"> firma</span> del propietario al momento de recibir la moto.
        </p>

        <Card className="page-column-card">
          <Card.Content>
            <Form onSubmit={this.handleSubmit} error={error}>
              <Form.Select
                fluid
                options={plateRegistrationMethods}
                name="optInOrOut"
                value={this.state.optInOrOut}
                onChange={this.handlePlateRegistrationMethodChange}
                className="fs-big"
              />
              {heroPlateRegistrationForm}
            </Form>
          </Card.Content>

        </Card>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  lead: store.main.lead,
  optInOrOut: store.main.plateRegistrationData.optInOrOut,
});

const mapDispatchToProps = dispatch => ({
  selectMyOwnPlateRegistration: async (leadId) => {
    await axios.post(
      `/api/leads/${leadId}/plate_registration/`,
      {
        opt_in_or_out: PERSONAL_PLATE_REGISTRATION,
      },
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
  selectHeroPlateRegistration: async (
    leadId,
    email,
    phone,
    personalData,
    address,
    frontDniImage,
    backDniImage) => {
    const body = {
      plate_registration_data: {
        opt_in_or_out: HERO_PLATE_REGISTRATION,
        email,
        phone,
        personal_data: {
          dni: personalData.dni,
          name: personalData.name,
          last_name: personalData.lastName,
        },
        address: {
          street: address.street,
          number: address.number,
          town: address.town,
          complements: address.complements,
          postal_code: address.postalCode,
          // The Address model has a telephone number but also PlateRegistrationData
          telephone_number: phone,
        },
        front_dni_image: {
          data: frontDniImage.data,
          name: frontDniImage.name,
          type: frontDniImage.type,
        },
        back_dni_image: {
          data: backDniImage.data,
          name: backDniImage.name,
          type: backDniImage.type,
        },
      },
    };
    await axios.post(
      `/api/leads/${leadId}/plate_registration/`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationPage));
