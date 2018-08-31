/* global FileReader */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Message, Grid, Card, Segment, Divider } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import axios from 'axios';
import humps from 'humps';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import dniImage from '../images/dni.svg';
import { moneyFormatter } from '../DashboardPage/CheckoutSummary';
import { PERSONAL_PLATE_REGISTRATION, HERO_PLATE_REGISTRATION } from './constants';
import { changePlateRegistrationData } from '../../actions/plateRegistration';

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
    plateRegistrationData: propTypes.shape({
      optInOrOut: propTypes.string,
      phone: propTypes.shape({
        phone: propTypes.string,
      }),
      personalData: propTypes.shape({
        name: propTypes.string,
        lastName: propTypes.string,
        dni: propTypes.string,
      }),
      email: propTypes.shape({
        email: propTypes.string,
      }),
      address: propTypes.shape({
        town: propTypes.string,
        telephoneNumber: propTypes.string,
        street: propTypes.string,
        postalCode: propTypes.string,
        number: propTypes.string,
        complements: propTypes.string,
      }),
      plateRegistrationType: propTypes.shape({
        name: propTypes.string,
      }),
    }).isRequired,
    plateRegistrationTypes: propTypes.arrayOf(propTypes.shape({
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      optInOrOut: props.plateRegistrationData.plateRegistrationType ?
        props.plateRegistrationData.plateRegistrationType.name : HERO_PLATE_REGISTRATION,
      email: this.isValueNullOrUndefined(props.plateRegistrationData.email) ? '' : props.plateRegistrationData.email.email,
      phone: this.isValueNullOrUndefined(props.plateRegistrationData.phone) ? '' : props.plateRegistrationData.phone.phone,
      personalData: {
        dni: this.isValueNullOrUndefined(props.plateRegistrationData.personalData) ? '' : props.plateRegistrationData.personalData.dni,
        name: this.isValueNullOrUndefined(props.plateRegistrationData.personalData) ? '' : props.plateRegistrationData.personalData.name,
        lastName: this.isValueNullOrUndefined(props.plateRegistrationData.personalData) ? '' : props.plateRegistrationData.personalData.lastName,
      },
      address: {
        street: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.street,
        number: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.number,
        town: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.town,
        complements: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.complements,
        postalCode: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.postalCode,
        telephoneNumber: this.isValueNullOrUndefined(props.plateRegistrationData.address) ? '' : props.plateRegistrationData.address.telephoneNumber,
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

  isValueNullOrUndefined = value => value === undefined || value === null;

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.hasLoadedImage(this.state.frontDniImage)) {
      const newErrors = this.state.errors;
      newErrors.frontDniImage = true;
      newErrors.description = 'Falta cargar la imagen frontal del DNI.';
      this.setState({ errors: newErrors });
      return;
    }
    if (!this.hasLoadedImage(this.state.backDniImage)) {
      const newErrors = this.state.errors;
      newErrors.backDniImage = true;
      newErrors.description = 'Falta cargar la imagen trasera del DNI.';
      this.setState({ errors: newErrors });
      return;
    }

    this.props.selectHeroPlateRegistration(
      this.props.lead.id,
      this.state.email,
      this.state.phone,
      this.state.personalData,
      this.state.address,
      this.state.frontDniImage,
      this.state.backDniImage,
    );
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
    this.setState({ personalData: newPersonalData });
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

  plateRegistrationTypePriceByName = typeName => (
    this.props.plateRegistrationTypes.find(type => type.name === typeName).price
  );

  costInfoText = () => (
    <React.Fragment>
      <p className="fs-big txt-dark-gray txt-center">
        El patentamiento por cuenta de Hero tiene un costo de $ <span className="fw-bold">{moneyFormatter.format(this.plateRegistrationTypePriceByName(HERO_PLATE_REGISTRATION))} </span>
        y éste se gestionará <span className="fw-bold">integramente</span> solo se requerirá una
        <span className="fw-bold"> firma</span> del propietario al momento de recibir la moto. <br />
        El patentamiento por cuenta propia tiene un costo de $ <span className="fw-bold">{moneyFormatter.format(this.plateRegistrationTypePriceByName(PERSONAL_PLATE_REGISTRATION))} </span>
        por gastos de documentación. <br />
        Estos se incorporan a la financiación.
      </p>
    </React.Fragment>
  );

  hasLoadedImage = image => image.data !== '' && image.type !== '' && image.name !== ''

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    if (this.props.plateRegistrationTypes.length === 0) {
      return <h1>CARGANDO</h1>;
    }

    const frontButtonStyles = classNames(
      'ui button btn-outline',
      this.state.frontDniImage.name ? 'btn-green' : 'primary',
    );

    const backButtonStyles = classNames(
      'ui button btn-outline',
      this.state.backDniImage.name ? 'btn-green' : 'primary',
    );

    const personalDataFormGroup = (
      <React.Fragment>
        <Form.Input
          fluid
          required
          label="Nombre"
          type="text"
          maxLength={100}
          name="name"
          value={this.state.personalData.name}
          error={this.state.errors.name}
          onChange={this.handlePersonalDataChange}
          placeholder="Juan"
        />
        <Form.Input
          fluid
          required
          label="Apellido"
          type="text"
          maxLength={100}
          name="lastName"
          value={this.state.personalData.lastName}
          error={this.state.errors.lastName}
          onChange={this.handlePersonalDataChange}
          placeholder="Perez"
        />
        <Form.Input
          fluid
          required
          label="DNI"
          type="text"
          minLength={6}
          maxLength={9}
          name="dni"
          value={this.state.personalData.dni}
          error={this.state.errors.dni}
          onChange={this.handlePersonalDataChange}
          placeholder="12.345.678"
        />
        <Form.Input
          fluid
          required
          label="Dirección que aparece en el DNI"
          type="text"
          name="street"
          value={this.state.address.street}
          error={this.state.errors.street}
          onChange={this.handleAddressDataChange}
          placeholder="Av. del Libertador 1150, Vicente López. Buenos Aires, Argentina"
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
          placeholder="1A"
        />
        <Form.Input
          fluid
          required
          label="Código postal"
          type="text"
          maxLength={10}
          name="postalCode"
          value={this.state.address.postalCode}
          error={this.state.errors.postalCode}
          onChange={this.handleAddressDataChange}
          placeholder="1234"
        />
        <Form.Input
          fluid
          required
          label="Email"
          type="email"
          name="email"
          value={this.state.email}
          error={this.state.errors.email}
          onChange={this.handleChange}
          placeholder="ejemplo@email.com"
        />
        <Form.Input
          fluid
          required
          label="Celular/Teléfono fijo"
          minLength={6}
          maxLength={25}
          type="text"
          name="phone"
          value={this.state.phone}
          error={this.state.errors.phone}
          onChange={this.handleChange}
          placeholder="1112345678"
        />
      </React.Fragment>);

    let plateRegistrationForm;
    if (this.state.optInOrOut === HERO_PLATE_REGISTRATION) {
      plateRegistrationForm = (
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
                    <label className={frontButtonStyles} htmlFor="frontDni">
                      { this.state.frontDniImage.name ?
                        <span>{this.state.frontDniImage.name}</span> :
                        <span> <i className="upload icon" /> Imagen frontal DNI</span>
                      }
                    </label>
                    <input type="file" id="frontDni" style={{ display: 'none' }} onChange={this.handleFrontDniImageChange} />
                  </div>
                  <div className="required field">
                    <label className={backButtonStyles} htmlFor="backDni">
                      { this.state.backDniImage.name ?
                        <span>{this.state.backDniImage.name}</span> :
                        <span> <i className="upload icon" /> Imagen dorso DNI</span>
                      }
                    </label>
                    <input type="file" id="backDni" style={{ display: 'none' }} onChange={this.handleBackDniImageChange} />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider />

            {personalDataFormGroup}
            <Message
              error
              header="Error"
              content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.description)}
            />

            <Segment attached="bottom" className="txt-center">
              <Button
                size="big"
                primary
                type="submit"
              >Continuar
              </Button>
            </Segment>

          </Segment>
        </React.Fragment>);
    } else {
      plateRegistrationForm = (
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

        {this.costInfoText()}

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
              {plateRegistrationForm}
            </Form>
          </Card.Content>

        </Card>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  lead: store.main.lead,
  plateRegistrationData: store.main.plateRegistration.plateRegistrationData,
  plateRegistrationTypes: store.main.plateRegistration.plateRegistrationTypes,
});

const mapDispatchToProps = dispatch => ({
  selectMyOwnPlateRegistration: async (leadId) => {
    const body = {
      plate_registration_data: {
        opt_in_or_out: PERSONAL_PLATE_REGISTRATION,
      },
    };
    await axios.post(
      `/api/leads/${leadId}/plate_registration/`,
      body,
    ).then((response) => {
      console.log(response); // eslint-disable-line no-console
      dispatch(changePlateRegistrationData(humps.camelizeKeys(body.plate_registration_data)));
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
      dispatch(changePlateRegistrationData(humps.camelizeKeys(body.plate_registration_data)));
      dispatch(push('/dashboard'));
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
      });
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationPage));
