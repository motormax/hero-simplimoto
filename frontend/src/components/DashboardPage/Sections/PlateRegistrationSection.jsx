import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import { plateRegistrationDataFetched, startedFetchingPlateRegistrationData } from '../../../actions/plateRegistrationData';

class PlateRegistrationSection extends Component {
  static propTypes = {
    fetchPlateRegistrationData: propTypes.func.isRequired,
    changeToPlateRegistration: propTypes.func.isRequired,
    t: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,

    plateRegistrationData: propTypes.shape({
      id: propTypes.number.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    if (!this.props.plateRegistrationData.id) {
      this.props.fetchPlateRegistrationData(this.props.lead.id);
    }
  }

  displayLegend = () => (
    <p className="txt-med-gray fs-medium">
      Nos encargamos del patentamiento de tu moto para que tengas listos
      <span className="fw-bold"> todos los papeles para salir a andar </span>
      en el momento que recibís la moto
    </p>
  );

  render() {
    const { t, plateRegistrationData } = this.props;

    const isOk = plateRegistrationData.id;
    const color = isOk ? '#67CC4F' : 'red';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {plateRegistrationData.id ? <Icon size="large" className="txt-green" name="check" /> : <Icon size="large" color={color} name="arrow right" />}}
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">
                {t('plate_registration')}
                <span className="fs-medium fw-normal txt-dark-gray"> {t('currency_sign')}</span>
                <span className="fs-medium fw-bold txt-dark-gray"> 3,800</span>
              </h3>
              {this.displayLegend()}
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToPlateRegistration()}>Preparar patentamiento</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  lead: state.main.lead,
  plateRegistrationData: state.main.plateRegistrationData,
});

const mapDispatchToProps = dispatch => ({
  fetchPlateRegistrationData: async (leadId) => {
    dispatch(startedFetchingPlateRegistrationData());
    const { data: { data: plateRegistrationData } } = await axios.get(`/api/leads/${leadId}/plate_registration`);
    dispatch(plateRegistrationDataFetched(plateRegistrationData));
  },
  changeToPlateRegistration: () => {
    dispatch(push('/plate-registration'));
  },
});

export default translate('plateRegistration')(connect(mapStateToProps, mapDispatchToProps)(PlateRegistrationSection));
