
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { Button } from 'semantic-ui-react';

class ResponsibilityDisclaimer extends Component {
  static propTypes = {
    goBack: propTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h2 className="fs-massive txt-dark-gray fw-bold">DESCARGO DE RESPONSABILIDAD</h2>
        <p className="fs-large txt-dark-gray">
          Todo el contenido pero no limitado al texto, gráficos, diseños y marcas de este sitio
          es propiedad de Distribuidora Argentina de Motos S.A. Puede descargar el contenido
          sólo para uso personal
          y sólo sin propósitos comerciales. La modificación del contenido, reproducción o
          incorporación en cualquier trabajo, publicación o sito, ya sea en copia impresa o
          formato electrónico, como publicaciones en cualquier otro sitio, está estrictamente
          prohibido y Distribuidora Argentina de Motos S.A. tiene todos los derechos reservados.
        </p>
        <p className="fs-large txt-dark-gray">
          Distribuidora Argentina de Motos S.A. hará todo lo posible para incluir la información
          precisa en el sitio y
          sólo con propósitos generales. Distribuidora Argentina de Motos S.A. no tiene
          representaciones, garantías o
          seguridad sobre la precisión, difusión o integridad de la información provista.
        </p>
        <p className="fs-large txt-dark-gray">
          La información sobre este sitio no constituye una incitación a invertir en Distribuidora
          Argentina de Motos S.A.
          y Distribuidora Argentina de Motos S.A. o sus representantantes, agentes empleadores
          no serán responsables de
          ninguna pérdida, daño o gastos ya sean directos, indirectos, imprevistos o indirectos,
          provocados debido al acceso a este sitio y cualquier sitio conectado al mismo.
        </p>
        <div className="txt-center" attached="bottom">
          <Button size="large" onClick={() => this.props.goBack()}>Volver</Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => {
    dispatch(goBack());
  },
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsibilityDisclaimer);
