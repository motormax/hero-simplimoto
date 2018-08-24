import React, { Component } from 'react';
import { Button, Card, Icon, Segment } from 'semantic-ui-react';

const message = 'Tu pago ha sido procesado con éxito';

class SuccessPage extends Component {
  render() {
    return (
      <div>
        <Card className="page-column-card page-column-card_slim">
          <Segment attached className="not-border-bottom">
            <h2 className="fs-massive fw-bold txt-center">Felicitaciones</h2>
          </Segment>
          <Segment attached className="txt-center txt-green">
            <Icon name="check circle" size="massive" />
            <p className="margin-top-tinny fs-big txt-med-gray txt-center">{message}</p>
          </Segment>
        </Card>
      </div>
    );
  }
}

export default SuccessPage;
