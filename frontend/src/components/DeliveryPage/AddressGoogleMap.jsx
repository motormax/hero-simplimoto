import React from 'react';
import PropTypes from 'prop-types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import pickupLocations from './pickupLocations';
import loadMap from './mapsHelper';

// Parque Centenario - centro de la Capital Federal
const cityCenter = {
  lat: -34.608895,
  lng: -58.435353,
};

class AddressGoogleMap extends React.Component {
    static propTypes = {
      onPickupLocationChange: PropTypes.func.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        markers: [],
      };
      this.buildMap = this.buildMap.bind(this);
    }

    componentDidMount() {
      loadMap(this.handleMapLoaded);
    }

    handleMapLoaded = () => {
      this.buildMap();
    };

  /* eslint-env browser */
    async buildMap() {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: cityCenter,
        zoom: 13,
        mapTypeId: 'roadmap',
      });
      this.setState({ map });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        }, (error) => {
          console.log('error', error); // eslint-disable-line no-console
        });
      }
    }

    changePickupLocation = (newLocation) => {
      const location = pickupLocations.find(loc => loc.value === newLocation);
      const position = {
        lat: location.latitude,
        lng: location.longitude,
      };
      this.state.map.setCenter(position);
      this.state.map.setZoom(16);
    };

    changeDeliveryGeolocation = (latitude, longitude) => {
      this.cleanMarkers();

      const position = {
        lat: latitude,
        lng: longitude,
      };
      const marker = new window.google.maps.Marker({
        map: this.state.map,
        position,
      });
      this.state.map.setCenter(position);
      this.state.map.setZoom(16);
      this.setState({ markers: [marker] });
    };

      reset = (address) => {
        let position = cityCenter;
        if (address) {
          geocodeByAddress(address)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
              position = { lat, lng };
            })
            .catch((error) => {
              console.log('error', error); // eslint-disable-line no-console
            });
        }
        this.state.map.setCenter(position);
      };

      showPickupMarkers = () => {
        const markers = [];
        pickupLocations.forEach((location) => {
          const marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(location.latitude, location.longitude),
            map: this.state.map,
            title: location.value,
          });
          const contentString = `${'<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">'}${location.title}</h1>` +
                '<div id="bodyContent">' +
                `<p>${location.value}</p>` +
                '</div>' +
                '</div>';

          const infowindow = new window.google.maps.InfoWindow({
            content: contentString,
          });
          marker.addListener('click', (e) => {
            this.props.onPickupLocationChange(e, { value: marker.getTitle() });
            infowindow.open(this.state.map, marker);
          });
          markers.push(marker);
        });
        this.setState({ markers });
        this.state.map.setZoom(6);
        this.state.map.setCenter(cityCenter);
      };

      cleanMarkers = () => {
        this.state.markers.forEach((marker) => {
          marker.setMap(null);
        });
      };

      render() {
        const styles = {
          height: '50%',
          width: '80%',
          position: 'absolute',
          marginTop: '10px',
        };

        return (
          <div id="map" style={styles} />
        );
      }
}

export default AddressGoogleMap;
