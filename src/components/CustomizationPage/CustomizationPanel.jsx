import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Header, Menu, Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

const mirrorOptions = [
  { imageURL: 'http://www.triumphdirect.co.uk/ekmps/shops/122f9c/images/oval-style-mirror-drilled-stem-2180-p.jpg' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
];
const seatOptions = [
  { imageURL: 'https://3.imimg.com/data3/RO/IU/MY-15304011/motorbike-seat-500x500.png' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
];
const colorOptions = [
  { imageURL: 'https://www.colorcombos.com/images/colors/FF0000.png' },
  { imageURL: 'https://static.pinboard.in/whn/thumbs/whn.021.thumb.jpg' },
];

class CustomizationChooser extends Component {
  static propTypes = {
    options: propTypes.arrayOf(propTypes.shape({ imageURL: propTypes.string.isRequired })).isRequired,
    chosenOption: propTypes.number.isRequired,
    customizableName: propTypes.string.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <Header>{this.props.customizableName}</Header>
        <img
          alt={this.props.customizableName}
          style={{ width: '113px' }}
          src={this.props.options[this.props.chosenOption].imageURL}
        />
      </React.Fragment>
    );
  }
}

class CustomizationPanel extends Component {
  static propTypes = {
    changeMirror: propTypes.func.isRequired,
    chosenMirror: propTypes.number.isRequired,
    changeSeat: propTypes.func.isRequired,
    chosenSeat: propTypes.number.isRequired,
    changeColor: propTypes.func.isRequired,
    chosenColor: propTypes.number.isRequired,
  };

  customizableMenuItemFactory(customizableName, options, chosenOption, changeMethod) {
    return {
      menuItem: (
        <Menu.Item key={customizableName}><CustomizationChooser
          customizableName={customizableName}
          options={options}
          chosenOption={chosenOption}
        />
        </Menu.Item>),
      render: () => (
        <Tab.Pane attached>
          <Button onClick={() => changeMethod(1)}>Change</Button>
        </Tab.Pane>),
    };
  }

  render() {
    const panes = [
      this.customizableMenuItemFactory(
        'Mirror', mirrorOptions, this.props.chosenMirror,
        this.props.changeMirror,
      ),
      this.customizableMenuItemFactory(
        'Seat', seatOptions, this.props.chosenSeat,
        this.props.changeSeat,
      ),
      this.customizableMenuItemFactory(
        'Color', colorOptions, this.props.chosenColor,
        this.props.changeColor,
      ),
    ];
    return <Tab menu={{ pointing: true }} panes={panes} />;
  }
}

const mapStateToProps =
  store => ({
    chosenMirror: store.main.stages.customization.chosenMirror,
    chosenSeat: store.main.stages.customization.chosenSeat,
    chosenColor: store.main.stages.customization.chosenColor,
  });

const mapDispatchToProps = dispatch => ({
  changeMirror: optionNumber => dispatch({
    type: 'CHANGE_MIRROR',
    chosenOption: optionNumber,
  }),
  changeSeat: optionNumber => dispatch({
    type: 'CHANGE_SEAT',
    chosenOption: optionNumber,
  }),
  changeColor: optionNumber => dispatch({
    type: 'CHANGE_COLOR',
    chosenOption: optionNumber,
  }),
});

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(CustomizationPanel));
