/* eslint-disable jsx-a11y/alt-text,max-len,react/jsx-no-target-blank */
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

        <section id="portfolio" style={{ display: 'table' }}>
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

        <section style={{ display: 'table' }}>
          <div className="container">
            <div className="col-md-6">
              <h1 className="text-center">
                <span className="tituloheroh3">Vista 360º</span>
                <span className="subtitle">Move el mouse {'< >'} sobre la imágen y conoce la Nueva HUNK</span>
                <div style={{ margin: '0 auto', width: '20%', borderBottom: '2px solid #ff0000' }} />
              </h1>

              <div className="menu_rotation">
                <ul className="list_rotation">
                  <li><img src="images/1.jpg" /></li>
                  <li><img src="images/2.jpg" /></li>
                  <li><img src="images/3.jpg" /></li>
                  <li><img src="images/4.jpg" /></li>
                  <li><img src="images/5.jpg" /></li>
                  <li><img src="images/6.jpg" /></li>
                  <li><img src="images/7.jpg" /></li>
                  <li><img src="images/8.jpg" /></li>
                  <li><img src="images/1.jpg" /></li>

                </ul>
              </div>
              <h4 className="text-center margin-top20">Querés una <strong>Hunk</strong>? <a
                href="https://www.heromotodigital.com/?buyMoto=HUNK"
                target="_blank"
                className="btn btn-primary btn-xs"
              >
                <i className="fa fa-shopping-cart" />RESERVALA AHORA!
                                                                                         </a>
              </h4>
            </div>
            <div className="col-md-6">
              <h1 className="text-center">
                <span className="tituloheroh3">Sistema START/STOP (i3s)</span>
                <span className="subtitle">Conocé más del sistema patentado por HERO</span>
                <div style={{ margin: '0 auto', width: '20%', borderBottom: '2px solid #ff0000' }} />
              </h1>

              <span className="textOpenSans">

                <b>El Sistema I3S</b> apaga el motor cuando la moto se encuentra inmóvil en posición punto muerto o neutral producto de: semáforo en rojo, estacionamiento, trafico, etc. Es importante tener en cuenta no estar acelerando la moto y/o accionando el embrague.<br /><br />
                Para encender el motor nuevamente solo bastará con accionar la palanca del embrague  y automáticamente se activará el arranque eléctrico encendiendo el motor. Este Sistema  permite reducir de manera significativa el consumo de combustible, reduce el recalentamiento del motor y prolonga la vida útil del mismo al reducir el desgaste y las emisiones nocivas para el medio ambiente.
              </span>
              <br /><br />
              <a className="textOpenSans btn btn-primary fullwidth" href="sistemai3s.php"><i
                className="fa fa-cogs"
              /> Mirá mas detalles y beneficios del sistema i3S
              </a>


            </div>
          </div>
        </section>

      </div>
    );
  }
}
