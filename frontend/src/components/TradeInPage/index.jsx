import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Button, Form, Message, Card, Segment, Icon } from 'semantic-ui-react';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class TradeInPage extends Component {
  static propTypes = {
    lead: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
    submitTradeIn: propTypes.func.isRequired,
    goToDashboard: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      telephoneNumber: '',
      brand: '',
      model: '',
      year: '',
      description: '',
      location: '',
      license_plate: '',
      errors: {
        name: false,
        email: false,
        telephoneNumber: false,
        brand: false,
        model: false,
        year: false,
        license_plate: false,
        location: false,
        description: false,
        errorMessage: false,
      },
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.telephoneNumber.length < 8) {
      const newErrors = this.state.errors;
      newErrors.telephoneNumber = true;
      newErrors.errorMessage = 'Introducí un teléfono válido.';
      this.setState({ errors: newErrors });
      return;
    }
    this.sendTradeInData();
  };

  sendTradeInData = async () => {
    const tradeInData = {
      lead_id: this.props.lead.id,
      name: this.state.name,
      email: this.state.email,
      telephone: this.state.telephoneNumber,
      model: this.state.model,
      brand: this.state.brand,
      year: this.state.year,
      license_plate: this.state.license_plate,
      location: this.state.location,
      description: this.state.description,
    };
    try {
      await this.props.submitTradeIn(this.props.lead.id, tradeInData);
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

  render() {
    const errorValues = Object.keys(this.state.errors).map(key => this.state.errors[key]);
    const error = errorValues.some(Boolean);

    return (
      <div>
        <h2 className="fs-massive fw-bold txt-center">Vende tu moto usada</h2>
        <p className="fs-huge txt-med-gray txt-center">¡Cargá los datos de tu moto y te ayudamos a venderla!</p>
        <Card className="page-column-card">
          <Form onSubmit={this.handleSubmit} error={error}>
            <Segment className="not-border-bottom" attached>
              <p className="txt-dark-gray fw-bold fs-huge">¿Cómo te contactamos?</p>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Nombre completo"
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
                <Form.Input
                  fluid
                  required
                  label="Telefono"
                  type="text"
                  name="telephoneNumber"
                  value={this.state.telephoneNumber}
                  error={this.state.errors.telephoneNumber}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Localidad"
                  type="text"
                  name="location"
                  value={this.state.location}
                  error={this.state.errors.location}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Segment>
            <Segment attached>
              <p className="txt-dark-gray fw-bold fs-huge">¿Qué moto queres vender?</p>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Marca"
                  type="text"
                  name="brand"
                  value={this.state.brand}
                  error={this.state.errors.brand}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Modelo"
                  type="text"
                  name="model"
                  value={this.state.model}
                  error={this.state.errors.model}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  label="Año"
                  type="text"
                  name="year"
                  value={this.state.year}
                  error={this.state.errors.year}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  label="Patente"
                  type="text"
                  name="license_plate"
                  value={this.state.license_plate}
                  error={this.state.errors.license_plate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.TextArea
                fluid
                label="Descripción"
                placeholder="Contamos más del estado de tu moto..."
                type="text"
                name="description"
                value={this.state.description}
                error={this.state.errors.description}
                onChange={this.handleChange}
              />
            </Segment>
            <Message
              error
              header="Error"
              content={'Hubo un error al procesar la solicitud. '.concat(this.state.errors.errorMessage)}
            />
            <Segment className="txt-center" attached="bottom">
              <Button size="big" type="submit" primary>Confirmar</Button>
              <Button
                size="large"
                secondary
                className="btn-outline"
                type="button"
                onClick={this.props.goToDashboard}
              >
                <Icon name="chevron left" />
                Cancelar y Volver
              </Button>
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
  goToDashboard: () => {
    dispatch(push('/dashboard'));
  },
  submitTradeIn: async (leadId, tradeInData) => {
    const { data: { data: newTradeInData } } = await axios.post(`/api/leads/${leadId}/trade_in`, { trade_in_data: tradeInData });
    // dispatch(tradeInFetched(newTradeInData));
    console.log(newTradeInData); // eslint-disable-line no-console
    dispatch(push('/dashboard'));
  },
});

export default translate('dateYourBike')(connect(mapStateToProps, mapDispatchToProps)(TradeInPage));
