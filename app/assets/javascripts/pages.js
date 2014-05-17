(function() {
  $('.map').each(function (index, el) {
    var map = L.mapbox.map(el, 'gregstewart.map-yz33o2sf').setView([$(el).attr('data-lat'), $(el).attr('data-lon')], 16);
  });
})();