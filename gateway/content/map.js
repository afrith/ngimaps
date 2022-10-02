// resize layers control to fit into view.
function resizeLayerControl() {
  var layerControlHeight = document.getElementById("map").clientHeight - (10 + 50);
  var layerControl = document.getElementsByClassName('leaflet-control-layers-expanded')[0];

  layerControl.style.overflowY = 'auto';
  layerControl.style.maxHeight = layerControlHeight + 'px';
}

function createMap(divName) {
  // Create a map
  var map = L.map(divName, {
  worldCopyJump: true
  }).fitBounds([[-35,16.25],[-22,33]]);

  // Create a layer switcher
  var layers = L.control.layers(null, null, {collapsed:false}).addTo(map);

  var defaultLayer = L.tileLayer('/tiles/50k/{z}/{x}/{y}.png', {
    attribution: 'State Copyright &copy; 2004&ndash;2019 <a href="http://www.ngi.gov.za/">Chief Directorate: National Geo-spatial Information</a>',
    maxZoom: 15
  })
  layers.addBaseLayer(defaultLayer, "CDNGI Mapping 1:50k")
  defaultLayer.addTo(map)

  // Add OpenStreetMap layer
  layers.addBaseLayer(L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© <a target=\"_parent\" href=\"https://www.openstreetmap.org\">OpenStreetMap</a> and contributors, under an <a target=\"_parent\" href=\"https://www.openstreetmap.org/copyright\">open license</a>",
    maxZoom: 19
  }), "OpenStreetMap");

  // Add the permalink control
  map.addControl(new L.Control.Permalink());
  
  // Add URL hash updating
  new L.Hash(map);

  // Add self-locate control
  L.control.locate().addTo(map);

  L.control.mouseCoordinate({ position: 'bottomleft' }).addTo(map);

  map.on('resize', resizeLayerControl);
  resizeLayerControl();

  return map;
}
