import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import {getImageryurl} from 'map/config';


/**
 * The identifiers of the Cesium viewers in the application.
 * @type  {Object.<string>}
 */
export const viewerIdentifiers = {
  intelRequest: 'INTEL_REQUEST',
  liveView: 'LIVE_VIEW',
  location:'LOCATION',
};

/**
 * The map of viewer identifiers to their corresponding viewer instance.
 * @type  {Map.<string, Object>}
 */
export const viewers = new Map();

/**
 * Returns the viewer instance representing the provided viewer identifier.
 * @param   {string}  viewerId  The identifier of the viewer.
 * @param   {string}  elementId The identifier of the viewer's parent element.
 * @returns {Object}
 */
export function createViewer(viewerId, elementId) {
  if (viewers.has(viewerId)) {
    return;
  }
  const viewer = new Cesium.Viewer(elementId, {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: true,
    homeButton: false,
    infoBox: true,
    sceneModePicker: true,
    selectionIndicator: true,
    navigationHelpButton : false,
    timeline: false,
    imageryProvider: new Cesium.WebMapServiceImageryProvider({
      layers: 'amps:WORLDGEOTIF',
      proxy: new Cesium.DefaultProxy('/proxy/'),
      url: getImageryurl(),
      
    })});

  var layers = viewer.scene.imageryLayers;
  var statesLayer = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url : 'http://ec2-18-218-162-242.us-east-2.compute.amazonaws.com:8080/geoserver/wms',
    proxy: new Cesium.DefaultProxy('/proxy/'),
    srs:'EPSG:4326',
    layers: 'amps:states',
    credit : 'Black Marble imagery courtesy NASA Earth Observatory'
}));

statesLayer.alpha = 0.5;
var lebanonRoadsLayer = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
  url : 'http://ec2-18-218-162-242.us-east-2.compute.amazonaws.com:8080/geoserver/wms',
  proxy: new Cesium.DefaultProxy('/proxy/'),
  srs:'EPSG:4326',
  layers: 'amps:gis_osm_roads_free_1',
  credit : 'Black Marble imagery courtesy NASA Earth Observatory'
}));
lebanonRoadsLayer.alpha = 0.3;
  // Corrects the viewer styling
viewer.canvas.style.height = '100%';
viewer.canvas.style.width = '100%';


/**
 * TODO: Move to separate file
 * Attaching double click event on canvas, to retrieve lat, long values
*/
viewer.canvas.addEventListener('dblclick', function(e){
var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
 
        console.log(longitudeString + ', ' + latitudeString);
    } else {
      console.log('Globe was not picked');
    }
	
}, false);

  viewer.cesiumWidget._creditContainer.parentNode.removeChild(viewer.cesiumWidget._creditContainer);

  viewers.set(viewerId, viewer);

  return viewer;
}

/**
 * Destroys the viewer representing the provided identifier.
 * @param {string}  viewerId  The identifier of the viewer.
 */
export function destroyViewer(viewerId) {
  if (!viewers.has(viewerId)) {
    return;
  }

  viewers.get(viewerId).destroy();
  viewers.delete(viewerId);
}
