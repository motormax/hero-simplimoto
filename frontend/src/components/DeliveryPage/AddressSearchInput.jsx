import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { Form, Icon } from 'semantic-ui-react';

import loadMap from './mapsHelper';

const LOADING_STATE_NONE = 'NONE';
const LOADING_STATE_LOADED = 'LOADED';

class AddressSearchInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onAddressChange: PropTypes.func.isRequired,
    onGeocodeLocationChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      address: props.value,
      loadingState: LOADING_STATE_NONE,
    };
    if (props.value) {
      this.handleSelect(props.value);
    }
  }

  componentWillMount() {
    loadMap(this.handleMapLoaded);
  }

  handleMapLoaded = () => {
    this.setState({
      loadingState: LOADING_STATE_LOADED,
    });
  };

  handleChange = (address) => {
    this.setState({
      address,
    });
    this.props.onAddressChange(address);
  };

  handleSelect = (selected) => {
    this.setState({ address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        console.log('Success', lat, lng); // eslint-disable-line no-console
        this.props.onAddressChange(selected);
        this.props.onGeocodeLocationChange(lat, lng);
      })
      .catch((error) => {
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    clearSuggestions();
  };

  render() {
    const {
      address,
    } = this.state;

    let content;
    if (this.state.loadingState === LOADING_STATE_LOADED) {
      content = (
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className="address-search">
              <div className="input-container">
                <Form.Input
                  {...getInputProps({
                              placeholder: 'Buscar dirección ...',
                          })}
                  fluid
                  required
                  label="Dirección"
                  type="text"
                  name="address"
                />

                {this.state.address.length > 0 && (
                  <button
                    className="clear-button"
                    onClick={this.handleCloseClick}
                  >
                    <Icon name="delete"/>
                  </button>
                    )}
              </div>
              {suggestions.length > 0 && (
                <div className="autocomplete-container">
                  {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';

                        return (
                          /* eslint-disable react/jsx-key */
                          <div
                            {...getSuggestionItemProps(suggestion, { className })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{' '}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                </div>
                  )}
            </div>
              )}
        </PlacesAutocomplete>
      );
    } else {
      content = (
        <span>Loading</span>
      );
    }
    return (content);
  }
}

export default AddressSearchInput;
