import React, { Component } from 'react';
import propTypes from 'prop-types';
import { push } from 'react-router-redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Card, Icon, Segment, Button} from 'semantic-ui-react';

const message = 'Tu pago ha sido procesado con éxito. Recibirás un mail con la confirmación en pocos minutos.';

class SuccessPage extends Component {
  static propTypes = {    
    backToHome: propTypes.func.isRequired,
  };
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
          <Segment attached className="txt-center">
            <Button
              size="large"
              secondary
              onClick={() => {
                  this.props.backToHome();
                }}
            >Terminar
            </Button>
          </Segment>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = _ => ({
});
const mapDispatchToProps = dispatch => ({
  backToHome: async () => {
    dispatch(push('/'));
  },
});
export default translate('success')(connect(mapStateToProps, mapDispatchToProps)(SuccessPage));
