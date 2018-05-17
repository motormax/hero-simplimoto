import React, { Component } from 'react';
import propTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Card, Icon } from 'semantic-ui-react';


class FundingSection extends Component {
  static propTypes = {
    t: propTypes.func.isRequired,
    funding: propTypes.shape({}).isRequired,
  }

  render() {
    const { t, funding } = this.props;

    const isOk = true;
    const icon = isOk ? 'check circle outline' : 'warning circle';
    const color = isOk ? 'green' : 'red';

    return (
      <Card fluid color={color}>
        <Card.Content>
          <Card.Header>
            <Icon color={color} name={icon} />
            {t('title')}
          </Card.Header>
          <Card.Meta>{`Financiado: ${funding.isDefault}`}</Card.Meta>
          <Card.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc pulvinar tristique nisi et posuere
          </Card.Description>
          <Card.Content textAlign="right" extra>
            <Button primary>Change</Button>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default translate('funding')(FundingSection);
