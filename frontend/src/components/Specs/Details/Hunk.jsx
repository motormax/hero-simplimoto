/* eslint-disable jsx-a11y/alt-text,max-len,react/jsx-no-target-blank */
import React from 'react';
import './specs.css';
import hunkOnOff from '../../images/hunki3s-onoff.jpg';
import hunkTablero from '../../images/hunki3s-tablero.jpg';
import hunkMotor from '../../images/hunki3s-motor.jpg';
import hunkFrente from '../../images/hunki3s-frente.jpg';
import hunkAmortiguador from '../../images/hunki3s-amortiguador.jpg';
import hunkLuzTrasera from '../../images/hunki3s-luz-trasera.jpg';
import engine from '../../images/engine-icon.gif';
import chasis from '../../images/chasis-icon.gif';
import suspension from '../../images/suspension-icon.gif';
import brakes from '../../images/brakes-icon.gif';
import wheels from '../../images/wheels-icon.gif';
import electrical from '../../images/electrical-icon.gif';
import dimensions from '../../images/dimension-icon.gif';

export default class Hunk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdx: 0,
    };
  }

  handleTabClick = idx => (e) => {
    e.preventDefault();
    this.setState({ selectedIdx: idx });
  };

  render() {
    const classForIdx = idx =>
      (idx === this.state.selectedIdx ? ' active' : '');

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

        <section className="special-row" style={{ display: 'table' }}>
          <div className="divider">
            <i className="rounded fa fa-paint-brush" />
          </div>
          <h1 className="text-center">
            <span className="tituloheroh3">Colores</span>
            <span className="subtitle">ELEGI EL COLOR DE TU NUEVA HERO!</span>
            <div style={{ margin: '0 auto', width: '20%', borderBottom: '2px solid #ff0000' }} />
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-2">
                <div className="item-box">
                  <div style={{ height: '60px', background: '#333333' }} />
                  <div className="item-box-desc">
                    <h4>Negro Mate</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="item-box">
                  <div style={{ height: '60px', background: '#111111' }} />
                  <div className="item-box-desc">
                    <h4>Negro Phanter</h4>
                  </div>
                </div>
              </div>


              <div className="col-md-2">
                <div className="item-box">
                  <div style={{ height: '60px', background: '#e50a0a' }} />
                  <div className="item-box-desc">
                    <h4>Rojo</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <div className="item-box">
                  <div style={{ height: '60px', background: '#ffffff' }} />
                  <div className="item-box-desc">
                    <h4>Blanco</h4>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>


        <div style={{ background: '#eee' }} id="shop">
          <section className="container">
            <div className="col-md-12">
              <h3 className="page-header margin-bottom40" style={{ fontSize: '1.8em', fontWeight: 300 }}>
                Especificaciones <strong className="styleColor">técnicas</strong>
              </h3>

              <div className="tabs nomargin-top">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#tab1" data-toggle="tab" onClick={this.handleTabClick(0)}>
                      <img src={engine} /> MOTOR
                    </a>
                  </li>
                  <li>
                    <a href="#tab2" data-toggle="tab" onClick={this.handleTabClick(1)}>
                      <img src={chasis} /> TRANSMISIÓN
                    </a>
                  </li>
                  <li>
                    <a href="#tab3" data-toggle="tab" onClick={this.handleTabClick(2)}>
                      <img src={suspension} /> SUSPENSIÓN
                    </a>
                  </li>
                  <li>
                    <a href="#tab7" data-toggle="tab" onClick={this.handleTabClick(6)}>
                      <img src={brakes} /> FRENOS
                    </a>
                  </li>
                  <li>
                    <a href="#tab4" data-toggle="tab" onClick={this.handleTabClick(3)}>
                      <img src={wheels} /> RUEDAS
                    </a>
                  </li>
                  <li>
                    <a href="#tab5" data-toggle="tab" onClick={this.handleTabClick(4)}>
                      <img src={electrical} /> ELÉCTRICO
                    </a>
                  </li>
                  <li>
                    <a href="#tab6" data-toggle="tab" onClick={this.handleTabClick(5)}>
                      <img src={dimensions} /> DIMENSIONES
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div id="tab1" className={`textOpenSans tab-pane${classForIdx(0)}`}>
                    <div className="table-responsive">


                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="300"><span>Motor Tipo</span></th>
                            <td>Por aire, 4 - tiempos 1 cilindro OHC</td>
                          </tr>
                          <tr>
                            <th><span>Desplazamiento</span></th>
                            <td>149.2 cc</td>
                          </tr>
                          <tr>
                            <th><span>Potencia Max. </span></th>
                            <td>11 KW (15 BHP) @ 8500 rpm</td>
                          </tr>
                          <tr>
                            <th><span>Torque Max. </span></th>
                            <td>13.50 Nm @ 7000 rpm</td>
                          </tr>
                          <tr>
                            <th><span>Diámetro x Carrera</span></th>
                            <td>57.3 x 57.8 mm</td>
                          </tr>
                          <tr>
                            <th><span>Carburador</span></th>
                            <td>Carburador con control variable de ignicion</td>
                          </tr>
                          <tr>
                            <th><span>Relación de Compresión</span></th>
                            <td>10 : 1</td>
                          </tr>
                          <tr>
                            <th><span>Arranque</span></th>
                            <td>Automatico</td>
                          </tr>
                          <tr>
                            <th><span>Encendido</span></th>
                            <td>AMI - Advanced Microprocessor Ignition System</td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab2" className={`textOpenSans tab-pane${classForIdx(1)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Embrague</span></th>
                            <td>Multidisco</td>
                          </tr>
                          <tr>
                            <th><span>Caja de Cambios</span></th>
                            <td>5 velocidades</td>
                          </tr>
                          <tr>
                            <th><span>Chasis</span></th>
                            <td>Tubular Diamond Type</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab3" className={`textOpenSans tab-pane${classForIdx(2)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Delantera</span></th>
                            <td>Telescopica Hidraulica</td>
                          </tr>
                          <tr>
                            <th><span>Trasera</span></th>
                            <td>Swing arm con 5 pasos adjustables con deposito de gas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab7" className={`textOpenSans tab-pane${classForIdx(6)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Freno Delantero</span></th>
                            <td>Disco - Diametro 240 mm</td>
                          </tr>
                          <tr>
                            <th><span>Freno Delantero</span></th>
                            <td>Campana - 130 mm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab4" className={`textOpenSans tab-pane${classForIdx(3)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Tamaño Rin Delantero</span></th>
                            <td>18 x 1.85, de aleacion</td>
                          </tr>
                          <tr>
                            <th><span>Tamaño Rin Trasero</span></th>
                            <td>18 x 2.15, de aleacion</td>
                          </tr>
                          <tr>
                            <th><span>Tamaño llanta delantera</span></th>
                            <td>80/100 x 18 - 47 P, Tubeless Tyres</td>
                          </tr>
                          <tr>
                            <th><span>Tamaño llanta trasera</span></th>
                            <td>110/90 x 18 - 61 P, Tubeless</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab5" className={`textOpenSans tab-pane${classForIdx(4)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Batería</span></th>
                            <td>12 V - 4 Ah, MF Bateria</td>
                          </tr>
                          <tr>
                            <th><span>Lámpara/Luz delantera</span></th>
                            <td>12 V - 35W/35W - Halogen Bulb Trapeziodal MFR</td>
                          </tr>
                          <tr>
                            <th><span>Lámpara/Luz Trasera o de Freno</span></th>
                            <td>12 V - 0.5 W / 4.1 W (LED Lamps)</td>
                          </tr>
                          <tr>
                            <th><span> Luz de Cruce</span></th>
                            <td>12V - 10 W (Amber Bulb) x 4 nos. (Multi - Reflector- Clear Lens)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab6" className={`textOpenSans tab-pane${classForIdx(5)}`}>
                    <div className="table-responsive">
                      <table className="table table-hover" width="500" border="0" cellSpacing="0" cellPadding="0">
                        <tbody>
                          <tr>
                            <th width="200"><span>Largo</span></th>
                            <td>2080 mm</td>
                          </tr>
                          <tr>
                            <th><span>Ancho</span></th>
                            <td>765 mm</td>
                          </tr>
                          <tr>
                            <th><span> Alto</span></th>
                            <td>1095 mm</td>
                          </tr>
                          <tr>
                            <th><span>Base de la Rueda</span></th>
                            <td>1325 mm</td>
                          </tr>
                          <tr>
                            <th><span> Distancia del Suelo</span></th>
                            <td>163 mm</td>
                          </tr>
                          <tr>
                            <th><span> Peso (seco)</span></th>
                            <td>130 Kgs.</td>
                          </tr>
                          <tr>
                            <th><span>Carga máxima</span></th>
                            <td>145 kg (Brakes - FR/RR--{'>'} Disc / Drum) 147 Kg (Brakes - FR/RR - Disc / Drum)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    );
  }
}
