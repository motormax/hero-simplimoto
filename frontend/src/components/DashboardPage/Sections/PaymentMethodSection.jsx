import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';


class PaymentMethodSection extends Component {
  static propTypes = {
    user: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.paymentMethodForm = React.createRef();
    this.state = {
      paymentMethod: {
        cardNumber: '',
      },
      errors: {
        cardNumber: false,
      },
    };
  }

  handleFormDataChange = (event) => {
    const { name: inputName, value } = event.target;
    const newData = this.state.paymentMethod;
    newData[inputName] = value;
    this.setState({ paymentMethod: newData });
  };

  render() {
    const error = Object.values(this.state.errors)
      .some(Boolean);

    return (
      <div>
        <Form onSubmit={this.handleSubmit} error={error} ref={this.paymentMethodForm}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              label="Número de tarjeta"
              type="text"
              name="cardNumber"
              placeholder="4509 9535 6623 3704"
              data-checkout="cardNumber"
              value={this.state.paymentMethod.cardNumber}
              error={this.state.errors.cardNumber}
              onChange={this.handleFormDataChange}
              children={
                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                  placeholder="4509 9535 6623 3704"
                />
              }
            />
            {this.state.paymentMethod.cardNumber}
          </Form.Group>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  user: store.main.user,
});

export default translate('insurance')(connect(mapStateToProps)(PaymentMethodSection));

