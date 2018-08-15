import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';
import classNames from 'classnames';


class FinancingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    changeToSelectFinancing: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    financingForm: propTypes.shape({
      message: propTypes.string.isRequired,
      issuerName: propTypes.string.isRequired,
      paymentMethodName: propTypes.string.isRequired,
    }).isRequired,
    // saveFinancing: propTypes.func.isRequired,
  }

  render() {
    const { t } = this.props;

    // const isOk = true;
    const color = this.props.financingSelected ? '#67CC4F' : 'red';

    const message = this.props.financingSelected ? `Elegiste pagar en ${this.props.financingForm.message} con tu ${this.props.financingForm.paymentMethodName} del banco ${this.props.financingForm.issuerName}` : 'Elegí el financiamiento más conveniente';

    const buttonActionLabel = this.props.financingSelected ? 'Cambiar' : 'Seleccionar';

    const buttonActionStyle = classNames(
      this.props.financingSelected ? 'secondary btn-outline' : 'primary',
    );


    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              {this.props.financingSelected ? <Icon size="large" className="txt-green" name="check" /> : <Icon size="large" color='red' name="arrow right" />}
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
});

const mapDispatchToProps = dispatch => ({
  changeToSelectFinancing: () => {
    dispatch(push('/financing'));
  },
});

export default translate('financing')(connect(mapStateToProps, mapDispatchToProps)(FinancingSection));
