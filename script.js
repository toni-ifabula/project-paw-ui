function drawMap() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidG9uaTYxMiIsImEiOiJja2ZremZpZjIxMHI4MnBtanJydWo5MDlkIn0.zbCKkpFCaRWr-WJ3Tboc5g';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [110.415981, -7.779415], // starting position [lng, lat]
    zoom: 15
  });

  map.on('load', function () {
    // Add an image to use as a custom marker
    map.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        // Add a GeoJSON source with 2 points
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              // feature for Mapbox point
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  110.415981,
                  -7.779415
                ]
              },
              'properties': {
                'title': 'Lokasi'
              }
            }]
          }
        });

        // Add a symbol layer
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
          }
        });
      }
    );
  });
}