(function() {
  $('.map').each(function (index, el) {
    var map = L.mapbox.map(el, 'gregstewart.map-yz33o2sf').setView([$(el).attr('data-lat'), $(el).attr('data-lon')], 16);

    var feature = {
      // this feature is in the GeoJSON format: see geojson.org
      // for the full specification
      type: 'Feature',
      geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [$(el).attr('data-lat'), $(el).attr('data-lon')]
      },
      properties: {
        title: 'A Single Marker',
        description: 'Just one of me',
        // one can customize markers by adding simplestyle properties
        // http://mapbox.com/developers/simplestyle/
        'marker-size': 'large',
        'marker-color': '#f0a'
      }
    };

    L.mapbox.featureLayer(feature).addTo(map);

  })
})()