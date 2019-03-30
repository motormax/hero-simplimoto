import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import humps from 'humps';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import classNames from 'classnames';
import { financingSelected, startedFetchingFinancing } from '../../../actions/financingChoices';


class FinancingSection extends Component {
  static defaultProps = {
    isLoading: false,
  }
  static propTypes = {
    t: propTypes.func.isRequired,
    lead: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
    changeToSelectFinancing: propTypes.func.isRequired,
    fetchFinancing: propTypes.func.isRequired,
    isLoading: propTypes.bool,
    financingSelected: propTypes.bool,
    financingForm: propTypes.shape({
      provider: propTypes.string.isRequired,
      message: propTypes.string.isRequired,
      issuerName: propTypes.string.isRequired,
      paymentMethodName: propTypes.string.isRequired,
    }),
  };

  componentWillMount() {
    if (!this.props.financingSelected) {
      this.props.fetchFinancing(this.props.lead.id);
    }
  }

  financingMessage() {
    if (!this.props.financingSelected) {
      return 'Elegí el financiamiento más conveniente';
    }

    if (this.props.financingForm.provider === 'CREDICUOTAS') {
      return `Elegiste pagar en ${this.props.financingForm.message} con Credicuotas`;
    }

    if (this.props.financingForm.provider === 'BANK_TRANSFER') {
      return 'Elegiste pagar con transferencia bancaria';
    }

    return `Elegiste pagar en ${this.props.financingForm.message} con tu ${this.props.financingForm.paymentMethodName}, ${this.props.financingForm.issuerName}`;
  }

  render() {
    const { t, isLoading } = this.props;

    if (isLoading) {
      return <div>Cargando</div>;
    }
    const color = this.props.financingSelected ? '#67CC4F' : 'red';

    const message = this.financingMessage();

    const buttonActionLabel = this.props.financingSelected ? 'Cambiar' : 'Seleccionar';

    const buttonActionStyle = classNames(this.props.financingSelected ? 'secondary btn-outline' : 'primary');


    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column width={1}>
              {this.props.financingSelected ? <Icon size="large" className="txt-green" name="check" /> : <Icon size="large" color="red" name="arrow right" />}
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">{t('financing')}</h3>
              <p className="txt-med-gray fs-medium">{message}
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button
                fluid
                className={buttonActionStyle}
                onClick={() => this.props.changeToSelectFinancing()}
              >
                {buttonActionLabel} financiamiento
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
  financingSelected: state.main.financing.financingSelected,
  financingForm: state.main.financing.financingForm,
  isLoading: state.main.financing.isLoading,
});

const mapDispatchToProps = dispatch => ({
  changeToSelectFinancing: () => {
    dispatch(push('/financing'));
  },
  fetchFinancing: async (leadId) => {
    dispatch(startedFetchingFinancing());
    const { data: { data: financingForm } } = await axios.get(`/api/leads/${leadId}/financing_data`);
    dispatch(financingSelected(humps.camelizeKeys(financingForm)));
  },
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(FinancingSection));
