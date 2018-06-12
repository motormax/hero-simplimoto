import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Header, Menu, Tab, Image, List, Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';

const mirrorOptions = [
  { imageURL: 'http://www.triumphdirect.co.uk/ekmps/shops/122f9c/images/oval-style-mirror-drilled-stem-2180-p.jpg' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
];
const seatOptions = [
  { imageURL: 'https://3.imimg.com/data3/RO/IU/MY-15304011/motorbike-seat-500x500.png' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
];
const colorOptions = [
  {
    name: 'red',
    imageURL: 'https://www.colorcombos.com/images/colors/FF0000.png',
  },
  {
    name: 'blue',
    imageURL: 'https://www.colorcombos.com/images/colors/0000FF.png',
  },
  {
    name: 'black',
    imageURL: 'https://www.colorcombos.com/images/colors/000000.png',
  },
];

class CustomizableHeader extends Component {
  static propTypes = {
    imageURL: propTypes.string.isRequired,
    customizableName: propTypes.string.isRequired,
  };

  render() {
    return (
      <List>
        <Header>{this.props.customizableName}</Header>
        <Image
          alt={this.props.customizableName}
          style={{ width: '113px' }}
          src={this.props.imageURL}
        />
      </List>
    );
  }
}


function customizableMenuItemFactory(customizableName, options, chosenOption, changeMethod) {
  return {
    menuItem: (
      <Menu.Item key={customizableName}>
        <CustomizableHeader
          customizableName={customizableName}
          imageURL={options[chosenOption].imageURL}
        />
      </Menu.Item>),
    render: () => (
      <Tab.Pane attached>
        <Grid>
          <Image
            src={options[0].imageURL}
            onClick={() => changeMethod(0)}
            style={{ width: '113px' }}
          />
          <Image
            src={options[1].imageURL}
            onClick={() => changeMethod(1)}
            style={{ width: '113px' }}
          />
          <Image
            src={options[2].imageURL}
            onClick={() => changeMethod(2)}
            style={{ width: '113px' }}
          />
        </Grid>
      </Tab.Pane>),
  };
}

class CustomizationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenMirror: 0,
      chosenSeat: 0,
      chosenColor: 0,
    };
  }

  changeMirror = (option) => {
    this.setState({ chosenMirror: option });
  };

  changeSeat = (option) => {
    this.setState({ chosenSeat: option });
  };

  changeColor = (option) => {
    this.setState({ chosenColor: option });
  };

  render() {
    const panes = [
      customizableMenuItemFactory('Mirror', mirrorOptions, this.state.chosenMirror, this.changeMirror),
      customizableMenuItemFactory('Seat', seatOptions, this.state.chosenSeat, this.changeSeat),
      customizableMenuItemFactory('Color', colorOptions, this.state.chosenColor, this.changeColor),
    ];
    return <Tab menu={{ pointing: true }} panes={panes} />;
  }
}

export default translate('translations')(CustomizationPanel);
