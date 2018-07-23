import scriptjs from 'scriptjs';

const googleMapScriptUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDw0hy_2xjxbuTnwOVTTirzBdYhBd5I6aw&libraries=places';

async function loadMap(callback) {
  scriptjs(googleMapScriptUrl, callback);
}

export default loadMap;
