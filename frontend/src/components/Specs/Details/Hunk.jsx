/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './specs.css';
import hunkOnOff from '../../images/hunki3s-onoff.jpg';
import hunkTablero from '../../images/hunki3s-tablero.jpg';
import hunkMotor from '../../images/hunki3s-motor.jpg';
import hunkFrente from '../../images/hunki3s-frente.jpg';
import hunkAmortiguador from '../../images/hunki3s-amortiguador.jpg';
import hunkLuzTrasera from '../../images/hunki3s-luz-trasera.jpg';

export default class Hunk extends React.Component {
  render() {
    return (
      <div>
        <section className="container text-center">
          <h1>
            <span className="tituloheroh3">Nueva HUNK con sistema i3S</span>
            <span className="subtitle ">
              Características del nuevo modelo
            </span>
            <div
              style={{
                margin: '0 auto',
                width: '20%',
                borderBottom: '2px solid #ff0000',
              }}
            />
          </h1>
        </section>

        <section id="portfolio">
          <div className="container">
            <div className="col-md-3">
              <p className="textoheroh4">
                <b>Tecnología I3S.</b> Sistema que apaga el motor cuando tu
                moto se detiene ahorrando aún mas combustible.
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkOnOff}
              />
            </div>
            <div className="col-md-3">
              <p className="textoheroh4">
                Tablero con <b>información mas precisa</b>. Indicadores de
                pata baja y sistema I3S
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkTablero}
              />
            </div>
            <div style={{ clear: 'both' }} />
            <div className="col-md-3">
              <p className="textoheroh4">
                <b>Motor 150cm3</b> 15.6HP. Menor consumo - Mayor potencia
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkMotor}
              />
            </div>
            <div className="col-md-3">
              <p className="textoheroh4">
                Potente <b>faro delantero</b>. Excelente visibilidad de noche
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkFrente}
              />
            </div>
            <div style={{ clear: 'both' }} />
            <div className="col-md-3">
              <p className="textoheroh4">
                <b>Amortiguadores</b> con gas, regulables
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkAmortiguador}
              />
            </div>
            <div className="col-md-3">
              <p className="textoheroh4">
                <b>Stop trasero</b> con luces led.
              </p>
            </div>
            <div className="col-md-3">
              <img
                className="margin-bottom20 img-responsive img-circle"
                src={hunkLuzTrasera}
              />
            </div>
          </div>
        </section>

        <div className="divider">
          <i className="rounded fa fa-cogs" />
        </div>

      </div>
    );
  }
}
