import moment from 'moment';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { dateAppointmentFetched, startedFetchingAppointment } from '../../../actions/dateAppointments';

import dateYourBikeIcon from './../../images/dateyourbike-icon.svg';


class DateYourBikeSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    fetchDateAppointment: propTypes.func.isRequired,
    changeToDateYourBike: propTypes.func.isRequired,
    appointment: propTypes.shape({
      id: propTypes.number,
      address: propTypes.object,
    }).isRequired,
  };

  componentWillMount() {
    if (!this.props.appointment) {
      this.props.fetchDateAppointment(this.props.lead.id);
    }
  }

  render() {
    const { t, appointment } = this.props;
    const cardStyle = classNames('dashboard-card', {
      'date-your-bike': !appointment.id,
    });
    const textStyle = classNames(
      'fs-medium',
      appointment.id ? 'txt-med-gray' : 'txt-white',
    );
    const headerStyle = classNames(
      'fw-bold',
      appointment.id ? 'fs-big' : 'txt-white',
    );

    if (appointment.isLoading) {
      return <p>Cargando</p>;
    }

    return (
      <Segment className={cardStyle} style={{ borderLeftColor: appointment.id ? '#67CC4F' : 'transparent' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {appointment.id ? <Icon size="large" color="green" name="check" /> : <img src={dateYourBikeIcon} alt="Una cita a ciegas" />}
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className={headerStyle}>{t('title')}</h3>
              <p className={textStyle}>
                { appointment.id ?
                `Te llevamos la moto ${moment(appointment.date).locale('es').fromNow()} a ${appointment.address.street}` :
                "Te arreglamos una 'cita a ciegas' donde quieras"
              }
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className={appointment.id ? 'btn-outline' : 'btn-opacity'} fluid secondary onClick={() => this.props.changeToDateYourBike()}>
                <Icon className="calendar alternate" /> { appointment.id ? 'Cambiar' : 'Arreglá una cita'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchDateAppointment: async (leadId) => {
    dispatch(startedFetchingAppointment());
    const { data: { data: appointmentData } } = await axios.get(`/api/leads/${leadId}/date_appointment`);
    dispatch(dateAppointmentFetched(appointmentData));
  },
  changeToDateYourBike: () => {
    dispatch(push('/date'));
  },
});

const mapStateToProps = state => ({
  lead: state.main.lead,
  appointment: state.main.dateYourBike,
});

export default translate('dateyourbike')(connect(mapStateToProps, mapDispatchToProps)(DateYourBikeSection));
