import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Segment } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class BankTransferForm extends Component {
  static propTypes = {
    cancelFinancing: propTypes.func.isRequired,
  };

  render() {
    return (
      <Card className="page-column-card financing-page">
        <Segment attached className="txt-center">
          <p className="fs-huge txt-med-gray txt-center">Próximamente podrás pagar por medio de una transferencia bancaria.</p>
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

export default translate('bankTransferForm')(connect(mapStateToProps, mapDispatchToProps)(BankTransferForm));
