import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { Button } from 'semantic-ui-react';

class PrivacyPolicy extends Component {
  static propTypes = {
    goBack: propTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h2 className="fs-massive txt-dark-gray fw-bold">POLÍTICA DE PRIVACIDAD</h2>
        <p className="fs-large txt-dark-gray">
          <b>Fecha de actualización</b><br />
          Gracias por visitar www.heromotodigital.com. Respetamos mucho su privacidad y consideramos
          que es un elemento pertinente para nuestros negocios. Esta declaración de política de
          privacidad sólo se aplica a www.heromotodigital.com. No se aplica a la información
          recolectada y almacenada con otros objetivos más que para el sitio Web.
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Privacidad de información personal</b><br />
          Con el debido respeto a la privacidad de sus usuarios, el Sitio Web de Distribuidora Argentina de Motos S.A.
          (http://www.heromotodigital.com) se abstiene de obtener información pesonal de sus usuarios
           sin su debido consentimiento. Distribuidora Argentina de Motos S.A. no distribuye, vende o alquila ningún
           información personal recolectada en este sitio Web. Esto también se aplica para la
           información personal (direcciones de correo electrónico, direcciones postales, etc.)
           enviadas a nuestras direcciones y memoria de contactos de correo electrónico del sitio
           Web. Distribuidora Argentina de Motos S.A. no envía correos electrónicos no solicitados a los usuarios del sitio
           y la información personal ingredasa por medio de los formularios de registración del
           sitio, como el formulario de comentarios, formulario de quejas, etc., está protegido por
            funciones de seguridad.
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Política sobre Cookies</b><br />
          El sitio Web de Distribuidora Argentina de Motos S.A. estudia los datos de uso total para saber con qué
          frecuencia y cuándo se solicita o visita el contenido del sitio. No utiliza cookies
          persistentes (cookies de texto) o cookies de sesión con el propósito de controlar el
          uso del sitio. Una cookie persistente o de texto es un archivo que puede contener
          información del usuario. Se almacena en la computadora del usuario. El sitio Web de Distribuidora Argentina
          de Motos S.A. utiliza cookies de sesión (éstas no se almacenan en la computadora del usuario).
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Encuestas en línea</b><br />
          Para una mejor comprensión de las necesidades y el perfil de nuestros visitantes,
          realizamos encuestas en línea. Cuando realizamos una encuesta, intentaremos hacerle
          saber de qué manera utilizaremos dicha información que recolectamos en Internet. No
          obstante, esto no es obligatorio de nuestra parte. Puede reconocer y comprender que no
          hay obligación de su parte brindarnos su información personal y toda información que nos
          brinde es con su total consendimiento, voluntad propia y el deseo de brindar dicha
          información personal. También comprende que no tenemos ninguna obligación de verificar
          la fuente de la que proviene su información personal y que se considera que nos brindó.
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Enlaces a nuestros sitios Web</b><br />
          El sitio Web de Distribuidora Argentina de Motos S.A. puede contener enlaces a otros sitios y nosotros intentamos
          conectar sólo los sitios que compartimos nuestros altos estándares y respetamos la
          privacidad. No somos responsables del contenido o las prácticas de privacidad
          utlizadas por otros sitios.
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Cambios en la &quot;Declaración de privacidad&quot;</b><br />
          Con efecto en el futuro, Distribuidora Argentina de Motos S.A. se reserva el derecho a cambiar esta declaración
          de privacidad de vez en cuando. Cuando lo hacemos, también revisaremos la fecha de
          &quot;Fecha de actualización&quot; en la parte superior de la declaración de privacidad.
          Para cambios materiales sobre esta declaración de privacidad, notificaremos colocando un
          aviso en el sitio Web.
        </p>
        <p className="fs-large txt-dark-gray">
          <b>Seguridad</b><br />
          Distribuidora Argentina de Motos S.A. intenta tomar medidas razonables y adecuadas para proteger su información
          personal del acceso o revelación no autorizados. No obstante, no garantizamos o
          representamos que su información personal esté totalmente segura de piratas informáticos
          y otras amenazas de seguridad.
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
