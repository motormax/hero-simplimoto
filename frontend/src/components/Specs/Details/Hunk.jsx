/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import engine from '../../images/engine-icon.gif';
import chasis from '../../images/chasis-icon.gif';
import suspension from '../../images/suspension-icon.gif';
import brakes from '../../images/brakes-icon.gif';
import wheels from '../../images/wheels-icon.gif';
import electrical from '../../images/electrical-icon.gif';
import dimension from '../../images/dimension-icon.gif';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  handleTabClick = index => (e) => {
    e.preventDefault();
    this.setState({ activeIndex: index });
  }

  render() {
    const className = index => (this.state.activeIndex === index ? 'active' : '');
    return (
      <div>
        <section id className="special-row">
          <div className="divider">
            {/* divider */}
            <i className="rounded fa fa-paint-brush" />
          </div>
          <h1 className="text-center">
            <span className="tituloheroh3">Colores</span>
            <span className="subtitle">ELEGI EL COLOR DE TU NUEVA HERO!</span>
            <div
              style={{
              margin: '0 auto',
              width: '20%',
              borderBottom: '2px solid #ff0000',
            }}
            />
          </h1>
          <div className="container">
            <div className="row">
              {/* <div className="col-md-offset-2 col-md-2"> */}
              <div className="col-md-2">
                {/* item 3 */}
                <div className="item-box">
                  <div style={{ height: 60, background: '#333333' }} />
                  <div className="item-box-desc">
                    <h4>Negro Mate</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                {/* item 3 */}
                <div className="item-box">
                  <div style={{ height: 60, background: '#111111' }} />
                  <div className="item-box-desc">
                    <h4>Negro Phanter</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                {/* item 5 */}
                <div className="item-box">
                  <div style={{ height: 60, background: '#e50a0a' }} />
                  <div className="item-box-desc">
                    <h4>Rojo</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                {/* item 3 */}
                <div className="item-box">
                  <div style={{ height: 60, background: '#ffffff' }} />
                  <div className="item-box-desc">
                    <h4>Blanco</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h3 className="page-header margin-bottom40">
          Especificaciones <strong className="styleColor">técnicas</strong>
        </h3>
        <div className="tabs nomargin-top">
          <ul className="nav nav-tabs">
            <li className={className(0)}>
              <a href="#tab1" data-toggle="tab" onClick={this.handleTabClick(0)}>
                <img src={engine} /> MOTOR
              </a>
            </li>
            <li className={className(1)}>
              <a href="#tab2" data-toggle="tab" onClick={this.handleTabClick(1)}>
                <img src={chasis} /> TRANSMISIÓN
              </a>
            </li>
            <li className={className(2)}>
              <a href="#tab3" data-toggle="tab" onClick={this.handleTabClick(2)}>
                <img src={suspension} /> SUSPENSIÓN
              </a>
            </li>
            <li className={className(6)}>
              <a href="#tab7" data-toggle="tab" onClick={this.handleTabClick(6)}>
                <img src={brakes} /> FRENOS
              </a>
            </li>
            <li className={className(3)}>
              <a href="#tab4" data-toggle="tab" onClick={this.handleTabClick(3)}>
                <img src={wheels} /> RUEDAS
              </a>
            </li>
            <li className={className(4)}>
              <a href="#tab5" data-toggle="tab" onClick={this.handleTabClick(4)}>
                <img src={electrical} /> ELÉCTRICO
              </a>
            </li>
            <li className={className(5)}>
              <a href="#tab6" data-toggle="tab" onClick={this.handleTabClick(5)}>
                <img src={dimension} /> DIMENSIONES
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              id="tab1"
              className={`textOpenSans tab-pane ${className(0)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={300}>
                        <span>Motor Tipo</span>
                      </th>
                      <td>Por aire, 4 - tiempos 1 cilindro OHC</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Desplazamiento</span>
                      </th>
                      <td>149.2 cc</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Potencia Max. </span>
                      </th>
                      <td>11 KW (15 BHP) @ 8500 rpm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Torque Max. </span>
                      </th>
                      <td>13.50 Nm @ 7000 rpm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Diámetro x Carrera</span>
                      </th>
                      <td>57.3 x 57.8 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Carburador</span>
                      </th>
                      <td>Carburador con control variable de ignicion</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Relación de Compresión</span>
                      </th>
                      <td>10 : 1</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Arranque</span>
                      </th>
                      <td>Automatico</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Encendido</span>
                      </th>
                      <td>AMI - Advanced Microprocessor Ignition System</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab2"
              className={`textOpenSans tab-pane ${className(1)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Embrague</span>
                      </th>
                      <td>Multidisco</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Caja de Cambios</span>
                      </th>
                      <td>5 velocidades</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Chasis</span>
                      </th>
                      <td>Tubular Diamond Type</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab3"
              className={`textOpenSans tab-pane ${className(2)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Delantera</span>
                      </th>
                      <td>Telescopica Hidraulica</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Trasera</span>
                      </th>
                      <td>
                      Swing arm con 5 pasos adjustables con deposito de gas
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab7"
              className={`textOpenSans tab-pane ${className(6)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Freno Delantero</span>
                      </th>
                      <td>Disco - Diametro 240 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Freno Delantero</span>
                      </th>
                      <td>Campana - 130 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab4"
              className={`textOpenSans tab-pane ${className(3)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Tamaño Rin Delantero</span>
                      </th>
                      <td>18 x 1.85, de aleacion</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Tamaño Rin Trasero</span>
                      </th>
                      <td>18 x 2.15, de aleacion</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Tamaño llanta delantera</span>
                      </th>
                      <td>80/100 x 18 - 47 P, Tubeless Tyres</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Tamaño llanta trasera</span>
                      </th>
                      <td>110/90 x 18 - 61 P, Tubeless</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab5"
              className={`textOpenSans tab-pane ${className(4)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Batería</span>
                      </th>
                      <td>12 V - 4 Ah, MF Bateria</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Lámpara/Luz delantera</span>
                      </th>
                      <td>12 V - 35W/35W - Halogen Bulb Trapeziodal MFR</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Lámpara/Luz Trasera o de Freno</span>
                      </th>
                      <td>12 V - 0.5 W / 4.1 W (LED Lamps)</td>
                    </tr>
                    <tr>
                      <th>
                        <span> Luz de Cruce</span>
                      </th>
                      <td>
                      12V - 10 W (Amber Bulb) x 4 nos. (Multi - Reflector-
                      Clear Lens)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              id="tab6"
              className={`textOpenSans tab-pane ${className(5)}`}
            >
              <div className="table-responsive">
                <table
                  className="table table-hover"
                  width={500}
                  cellSpacing={0}
                  cellPadding={0}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <th width={200}>
                        <span>Largo</span>
                      </th>
                      <td>2080 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Ancho</span>
                      </th>
                      <td>765 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span> Alto</span>
                      </th>
                      <td>1095 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Base de la Rueda</span>
                      </th>
                      <td>1325 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span> Distancia del Suelo</span>
                      </th>
                      <td>163 mm</td>
                    </tr>
                    <tr>
                      <th>
                        <span> Peso (seco)</span>
                      </th>
                      <td>130 Kgs.</td>
                    </tr>
                    <tr>
                      <th>
                        <span>Carga máxima</span>
                      </th>
                      <td>
                      145 kg (Brakes - FR/RR--&gt; Disc / Drum) 147 Kg
                      (Brakes - FR/RR - Disc / Drum)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
