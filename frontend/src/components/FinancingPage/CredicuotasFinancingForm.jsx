import React, { Component } from 'react';
import { Button, Card, Form, Icon, Label, Radio, Segment } from 'semantic-ui-react';

class CredicuotasFinancingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      installmentOptions: [
        {
          installments: 1,
          message: '1 cuotas',
          label: '1 cuotas',
        },
        {
          installments: 3,
          message: '3 cuotas',
          label: '3 cuotas',
        },
        {
          installments: 6,
          message: '6 cuotas',
          label: '6 cuotas',
        },
        {
          installments: 12,
          message: '12 cuotas',
          label: '12 cuotas',
        }, // TODO: fetch data from the backend
      ],
      financingForm: {
        installments: undefined,
      },
    };
  }

  handleSubmit() {
    return this.state; // TODO
  }

  enableContinueButton() {
    return this.state.financingForm.installments;
  }

  handleInstallmentSelected(installment) {
    const newData = this.state.financingForm;
    newData.installments = installment.installments;
    newData.message = installment.message;
    newData.costs = installment.label;
    newData.monthlyAmount = installment.monthlyAmount;
    this.setState({ financingForm: newData });
  }

  render() {
    return (
      <Card className="page-column-card financing-page">
        <Form onSubmit={this.handleSubmit}>

          <Segment attached>
            <p className="txt-dark-gray fw-bold fs-huge">¿En cuantas cuotas?</p>
            <div className="txt-center">
              <span className="dp-inline-block txt-left">
                {this.state.installmentOptions.map(installment => (
                  <Form.Field key={installment.installments}>
                    <Radio
                      label={installment.message}
                      name="installment_id"
                      checked={this.state.financingForm.installments === installment.installments}
                      onChange={() => this.handleInstallmentSelected(installment)}
                    /><Label size="small">{installment.label}</Label>
                  </Form.Field>
              ))
              }
              </span>
            </div>
          </Segment>

          <Segment attached className="txt-center">
            <a href="https://clientes.credicuotas.com.ar" target="_blanck">
              <Icon.Group size="large">
                <Icon className="shield alternate" />
                <Icon corner className="check circle" />
              </Icon.Group>
              Estamos financiando tu compra a través de <strong>credicuotas</strong>
            </a>
          </Segment>

          <Segment attached="bottom" className="txt-center">
            <Button
              size="large"
              primary
              disabled={!this.enableContinueButton()}
              onClick={() => {
                // this.props.selectFinancing(this.props.lead.id, this.state.financingForm);
              }}
            >Continuar
            </Button>
            <Button
              size="large"
              secondary
              onClick={() => {
                // this.props.cancelFinancing();
              }}
            >Volver
            </Button>
          </Segment>
        </Form>
      </Card>
    );
  }
}

export default CredicuotasFinancingForm;
