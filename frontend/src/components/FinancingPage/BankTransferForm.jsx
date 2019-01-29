import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Segment, Icon } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class BankTransferForm extends Component {
  static propTypes = {
    cancelFinancing: propTypes.func.isRequired,
  };

  render() {
    return (
      <Card className="page-column-card financing-page">
        <Segment attached className="txt-center">
          <p className="txt-dark-gray fw-bold fs-big">1- Hacé un depósito o una transferencia bancaria a cualquiera de nuestras cuentas.</p>
          <p className="fs-large txt-med-gray txt-center"><b>Banco: </b>Banco Galicia</p>
          <p className="fs-large txt-med-gray txt-center"><b>Tipo de cuenta: </b>Cuenta corriente en Pesos</p>
          <p className="fs-large txt-med-gray txt-center"><b>Número de cuenta: </b>6001-3 019-1</p>
          <p className="fs-large txt-med-gray txt-center"><b>CBU: </b>00700191-20000006001315</p>
          <p className="fs-large txt-med-gray txt-center">O</p>
          <p className="fs-large txt-med-gray txt-center"><b>Banco: </b>Banco Santander Río</p>
          <p className="fs-large txt-med-gray txt-center"><b>Tipo de cuenta: </b>Cuenta corriente en Pesos</p>
          <p className="fs-large txt-med-gray txt-center"><b>Número de cuenta: </b>039-004592/4</p>
          <p className="fs-large txt-med-gray txt-center"><b>CBU: </b>00700191-20000006001315</p>
          <p className="fs-large txt-med-gray txt-center">Empresa</p>
          <p className="fs-large txt-med-gray txt-center"><b>A nombre de: </b>MARWEN S.A.</p>
          <p className="fs-large txt-med-gray txt-center"><b>CUIT: </b>0720039720000000459240</p>
          <p className="txt-dark-gray fw-bold fs-big">2- Descargá el comprobante y envialo por email.</p>
          <p className="fs-large txt-med-gray txt-center">Email: ventas@heromotodigital.com</p>
          <p className="fs-large txt-med-gray txt-center">Asunto: comprobante</p>
        </Segment>
        <Segment attached className="txt-center txt-blue">
          <Icon.Group size="large">
            <Icon className="shield alternate" />
            <Icon corner className="check circle" />
          </Icon.Group>
          <strong>IMPORTANTE!</strong>
          Recordá enviarnos un email con el comprobante de la transferencia adjunto.
        </Segment>
        <Segment attached="bottom" className="txt-center">
          <Button
            size="large"
            secondary
            onClick={() => {
                this.props.cancelFinancing();
              }}
          >Volver
          </Button>
        </Segment>
      </Card>
    );
  }
}

const mapStateToProps = () => ({
});


const mapDispatchToProps = dispatch => ({
  cancelFinancing: async () => {
    dispatch(push('/dashboard'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BankTransferForm);
