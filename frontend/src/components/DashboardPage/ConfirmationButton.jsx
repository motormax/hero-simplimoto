import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'semantic-ui-react';

class ConfirmationButton extends Component {
  static defaultProps = {
    financing: {},
    delivery: {},
    plateRegistration: {},
    insurance: {},
  };

  static propTypes = {
    financing: propTypes.shape({
      financingSelected: propTypes.bool.isRequired,
    }),
    delivery: propTypes.shape({
      id: propTypes.number.isRequired,
    }),
    plateRegistration: propTypes.shape({
      id: propTypes.number.isRequired,
    }),
    insurance: propTypes.shape({
      selected: propTypes.bool.isRequired,
    }),
    goToCheckout: propTypes.func.isRequired,
  };

  canConfirm = () => {
    const {
      financing, delivery, insurance, plateRegistration,
    } = this.props;

    return !!(
      financing && financing.financingSelected &&
      delivery && delivery.id &&
      insurance && insurance.selected &&
      plateRegistration && plateRegistration.id
    );
  };

  render() {
    return (
      <Button
        className="btn-displaced"
        size="huge"
        primary
        disabled={!this.canConfirm()}
        onClick={() => this.props.goToCheckout()}
      >
        Preparar la compra
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goToCheckout: () => {
    dispatch(push('/summary'));
  },
});

const mapStateToProps = state => ({
  lead: state.main.lead,
  financing: state.main.financing,
  delivery: state.main.delivery,
  insurance: state.main.insurance,
  plateRegistration: state.main.plateRegistrationData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationButton);
