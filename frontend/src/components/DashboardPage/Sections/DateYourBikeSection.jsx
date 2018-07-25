import moment from 'moment';
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { push } from 'react-router-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import { dateAppointmentFetched, startedFetchingAppointment } from '../../../actions/dateAppointments';


class DateYourBikeSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    user: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    fetchDateAppointment: propTypes.func.isRequired,
    changeToDateYourBike: propTypes.func.isRequired,
    appointment: propTypes.shape({
      address: propTypes.object.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.props.fetchDateAppointment(this.props.user.id);
  }

  render() {
    const { t, appointment } = this.props;

    if (appointment.isLoading) {
      return <p>Cargando</p>;
    }

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: appointment.id ? '#21ba45' : 'darkgrey' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {appointment.id ? <Icon size="large" color="green" name="check" /> : <Icon size="large" color="darkgrey" name="arrow right" />}
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">{t('title')}</h3>
              <p className="txt-med-gray fs-medium">{ appointment.id ?
                `Te llevamos la moto ${moment(appointment.date).locale('es').fromNow()} a ${appointment.address.street}` :
                'Podes pedir ver la moto en tu casa!'
              }
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button className="btn-outline" fluid secondary onClick={() => this.props.changeToDateYourBike()}>{t('change')}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchDateAppointment: async (userId) => {
    dispatch(startedFetchingAppointment());
    const { data: { data: appointmentData } } = await axios.get(`/api/users/${userId}/date_appointment`);
    dispatch(dateAppointmentFetched(appointmentData));
  },
  changeToDateYourBike: () => {
    dispatch(push('/date'));
  },
});

const mapStateToProps = state => ({
  user: state.main.user,
  appointment: state.main.dateYourBike,
});

export default translate('dateyourbike')(connect(mapStateToProps, mapDispatchToProps)(DateYourBikeSection));
