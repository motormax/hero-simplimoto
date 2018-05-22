import React, { Component } from 'react';
import { Button, Card, Header, Icon, Table } from 'semantic-ui-react';

class CheckoutSummary extends Component {
  render() {
    return (
      <Card fluid>
        <Card.Header>
          <Header>Factura</Header>
        </Card.Header>
        <Card.Content>
          <Table size="large">
            <Table.Body>
              <Table.Row>
                <Table.Cell>Modelo de moto</Table.Cell>
                <Table.Cell textAlign="right">$452,25</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Accesorios</Table.Cell>
                <Table.Cell textAlign="right">$152</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Delivery</Table.Cell>
                <Table.Cell textAlign="right">$0</Table.Cell>
              </Table.Row>
              <Table.Row error>
                <Table.Cell><Icon name="warning sign" />Seguro</Table.Cell>
                <Table.Cell textAlign="right">-</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell size="big">Total</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">$522,25</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Card.Content>
        <Card.Content textAlign="center" extra>
          <Button size="massive" primary positive>CONSEGUIR MOTO!</Button>
        </Card.Content>
      </Card>
    );
  }
}

export default CheckoutSummary;
