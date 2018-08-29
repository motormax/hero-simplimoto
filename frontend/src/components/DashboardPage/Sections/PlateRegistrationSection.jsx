import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import humps from 'humps';
import {
  plateRegistrationFetched,
  startedFetchingPlateRegistration,
} from '../../../actions/plateRegistration';
import { moneyFormatter } from '../CheckoutSummary';
import { HERO_PLATE_REGISTRATION } from '../../PlateRegistrationPage/constants';

export const registrationPrice = 3800;

class PlateRegistrationSection extends Component {
  static defaultProps = {
    isLoading: false,
  }
  static propTypes = {
    fetchPlateRegistration: propTypes.func.isRequired,
    changeToPlateRegistration: propTypes.func.isRequired,
    t: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,

    isLoading: propTypes.bool,
    plateRegistrationData: propTypes.shape({
      id: propTypes.number,
      plateRegistrationType: propTypes.shape({
        price: propTypes.string,
        name: propTypes.string,
      }),
    }).isRequired,
  };

  componentDidMount() {
    if (!this.props.plateRegistrationData.id) {
      this.props.fetchPlateRegistration(this.props.lead.id);
    }
  }

  showLegendWhenNotChosen = () => (
    <p className="txt-med-gray fs-medium">
      Nos encargamos del patentamiento de tu moto para que tengas listos
      <span className="fw-bold"> todos los papeles para salir a andar </span>
      en el momento en que recibís la moto.
    </p>
  );

  textPlateRegistrationChosen = () => (
    <span className="fw-bold">
      {this.props.plateRegistrationData.plateRegistrationType.name === HERO_PLATE_REGISTRATION ? ' con Hero' : ' por su cuenta'}
    </span>
  );

  showLegendWhenChosen = () => (
    <p className="txt-med-gray fs-medium">
      Ustéd eligió realizar el patentamiento
      {this.textPlateRegistrationChosen()}.
    </p>
  );

  displayLegend = () => (
    this.props.plateRegistrationData.plateRegistrationType ?
      this.showLegendWhenChosen() : this.showLegendWhenNotChosen()
  );

  showPlateRegistrationPrice = () => (
    <React.Fragment>
      <span className="fs-medium fw-normal txt-dark-gray"> {this.props.t('currency_sign')}</span>
      <span className="fs-medium fw-bold txt-dark-gray"> {moneyFormatter.format(this.props.plateRegistrationData.plateRegistrationType.price)}</span>
    </React.Fragment>
  );

  plateRegistrationPrice = () => (
    this.props.plateRegistrationData.plateRegistrationType ? this.showPlateRegistrationPrice() : ''
  )

  render() {
    const {
      t,
      plateRegistrationData,
      changeToPlateRegistration,
      isLoading,
    } = this.props;

    if (isLoading) {
      return <div>Cargando</div>;
    }

    const isOk = plateRegistrationData.id;
    const color = isOk ? '#67CC4F' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {plateRegistrationData.id ? <Icon size="large" className="txt-green" name="check" /> : <Icon
                size="large"
                color={color}
                name="arrow right"
              />}
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">
                {t('plate_registration')}
                {this.plateRegistrationPrice()}
              </h3>
              {this.displayLegend()}
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className="btn-outline" fluid secondary onClick={() => changeToPlateRegistration()}>Preparar
                patentamiento
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.main.lead,
  plateRegistrationData: state.main.plateRegistration.plateRegistrationData,
  isLoading: state.main.plateRegistration.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchPlateRegistration: async (leadId) => {
    dispatch(startedFetchingPlateRegistration());
    const { data: { data: plateRegistrationData } } = await axios.get(`/api/leads/${leadId}/plate_registration`);
    const { data: { data: plateRegistrationTypes } } = await axios.get('/api/plate_registration_types');
    dispatch(plateRegistrationFetched(humps.camelizeKeys(plateRegistrationData), plateRegistrationTypes));
  },
  changeToPlateRegistration: () => {
    dispatch(push('/plate-registration'));
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationSection));
