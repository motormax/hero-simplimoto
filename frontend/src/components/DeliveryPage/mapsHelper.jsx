import scriptjs from 'scriptjs';

const googleMapScriptUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC0Q1nB6mj4Fs38R8FRjhuQY460hxJqtmQ&libraries=places';

async function loadMap(callback) {
  scriptjs(googleMapScriptUrl, callback);
}

export default loadMap;
