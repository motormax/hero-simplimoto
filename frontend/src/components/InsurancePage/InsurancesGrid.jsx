import React, { Component } from 'react';
import propTypes from 'prop-types';

const optionsFromIssuers = (issuers) => {
  const map = new Map();

  issuers.forEach((issuer) => {
    issuer.cotizaciones.forEach((cot) => {
      map.set(cot.cobertura_id, {
        id: cot.cobertura_id,
        title: cot.cobertura,
      });
    });
  });

  return Array.from(map.values());
};

const InsuranceOption = ({
  option,
  issuerOptions,
  onClick,
  selected,
}) => {
  const currentOption = issuerOptions.find(opt => opt.cobertura_id === option.id);
  if (currentOption) {
    return (
      // eslint-disable-next-line
      <td
        style={
          {
            border: '1px solid #ddd',
            width: '20%',
            fontSize: '19px',
            fontWeight: 500,
            verticalAlign: 'middle',
            background: selected && 'orange',
            color: selected && 'white',
          }
        }
        onClick={() => onClick(currentOption)}
      >
        ${currentOption.premio}
      </td>
    );
  }
  return (
    <td
      style={
        {
          border: '1px solid #ddd',
          width: '20%',
          fontSize: '19px',
          fontWeight: 500,
          verticalAlign: 'middle',
        }
      }
    >
      X
    </td>
  );
};

InsuranceOption.propTypes = {
  option: propTypes.arrayOf(propTypes.object).isRequired,
  issuerOptions: propTypes.arrayOf(propTypes.object).isRequired,
  onClick: propTypes.func.isRequired,
  selected: propTypes.bool,
};

class InsurancesGrid extends Component {
  render() {
    const { options: issuers } = this.props;
    const knownOptions = optionsFromIssuers(issuers);

    const images = {
      mapfre: 'https://www.123seguro.com/images/front/table/mapfre.png',
      libra: 'https://4.bp.blogspot.com/-EbhruQjEDLo/WnRQeldOIaI/AAAAAAAABiE/zDmWBehmIOY7NzyL_kd25IgUHdYTqYSbQCLcBGAs/s400/libra.png',
      atm: 'https://www.atmseguros.com.ar/newsitedev/wp-content/uploads/2018/06/logo-atm-.png',
      orbis: 'https://www.123seguro.com/images/front/cotizar-auto/aseguradoras/orbis-seguros-de-autos.svg',
    };

    return (
      <table
        style={
          {
            border: '1px solid #ddd',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            width: '100%',
            verticalAlign: 'middle',
            lineHeight: 1,
            textAlign: 'center',
          }
        }
        cellPadding={0}
        cellSpacing={0}
      >
        <thead>
          <tr style={{ height: 60 }}>
            <th
              style={
                {
                  background: '#f4f4f4',
                  verticalAlign: 'middle',
                  borderTop: '1px solid #ddd',
                }
              }
            />
            {knownOptions.map(option =>
              (
                <td
                  key={option.title}
                  style={
                    {
                      border: '1px solid #ddd',
                      width: '30%',
                      verticalAlign: 'middle',
                      color: '#333',
                      fontWeight: '400',
                      fontSize: '13px',
                      minHeight: '70px',
                      padding: '0 5px',
                    }
                  }
                >
                  {option.title}
                </td>
              ))}
          </tr>
        </thead>
        <tbody>
          {
            issuers.map(issuer =>
              (
                <tr key={issuer.name} style={{ height: 60 }}>
                  <th
                    style={{
                      border: '1px solid #ddd',
                      height: 60,
                      backgroundColor: '#f6f6f6',
                    }}
                  >
                    <img src={images[issuer.name]} alt={issuer.name} style={{ height: 60 }} />
                  </th>
                  {
                    knownOptions.map((option) => {
                      const selected =
                        this.props.selected
                        && this.props.selected.issuer.name === issuer.name
                        && this.props.selected.option.cobertura === option.title;

                      return (<InsuranceOption
                        key={option.title}
                        option={option}
                        issuerOptions={issuer.cotizaciones}
                        onClick={currentOption =>
                          this.props.onOptionSelected(issuer, currentOption)
                        }
                        selected={selected}
                      />);
                    })
                  }
                </tr>
              ))
          }
        </tbody>
      </table>
    );
  }
}

InsurancesGrid.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  selected: propTypes.shape({
    issuer: propTypes.object.isRequired,
    option: propTypes.object.isRequired,
  }),
  onOptionSelected: propTypes.func.isRequired,
};

export default InsurancesGrid;
