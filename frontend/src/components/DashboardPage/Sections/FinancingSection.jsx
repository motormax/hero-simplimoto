import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Segment, Icon, Grid } from 'semantic-ui-react';


class FinancingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    changeToSelectFinancing: propTypes.func.isRequired,
    financingSelected: propTypes.bool.isRequired,
    financingForm: propTypes.shape({
      message: propTypes.string.isRequired,
    }).isRequired,
    // saveFinancing: propTypes.func.isRequired,
  }

  render() {
    const { t } = this.props;

    // const isOk = true;
    const color = this.props.financingSelected ? '#67CC4F' : 'red';

    const message = this.props.financingSelected ? this.props.financingForm.message : 'Elegí el financiamiento más conveniente';

    const buttonActionLabel = this.props.financingSelected ? 'Cambiar' : 'Seleccionar';

    return (
      <Segment className="dashboard-card" style={{ borderLeftColor: color }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color={color} name="arrow right" />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3 className="fw-bold fs-big">{t('financing')}</h3>
              <p className="txt-med-gray fs-medium">{message}
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button
                fluid
                primary
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
