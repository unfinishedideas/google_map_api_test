// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
class Spot {
  constructor(name, lat, lon) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
  }
}

temp_spots = [
  new Spot('spot1', 45.5051, -122.6750),
  new Spot('spot2', 60, -50),
  new Spot('spot3', 80, 150),
  new Spot('spot4', -50, 150)
]



// World map - wildcard!
// Replace temp_spots with api call!
function initBigMap() {

  test_spot = temp_spots.shift()

  var myCoords = new google.maps.LatLng(test_spot.lat, test_spot.lon);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('bigMap'), mapOptions);

  let spots = temp_spots

  spots.forEach(function(spot) {
    coords = new google.maps.LatLng(spot.lat, spot.lon);
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      label: spot.name,
      title: spot.name
    });
    var contentString = `<div id="content"><h3>${spot.name}</h3><a href="https://en.wikipedia.org/wiki/Golden_Gate_Bridge">${spot.name} Link</a></p></div>`;
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}

// Individual Map - from tut
function initMap(lat, lng) {
  var myCoords = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}
// Edit Map - from tut
function initMap2() {
  var lat = document.getElementById('place_latitude').value;
  var lng = document.getElementById('place_longitude').value;

  // if not defined create default position
  if (!lat || !lng){
    lat=51.5;
    lng=-0.125;
    document.getElementById('place_latitude').value = lat;
    document.getElementById('place_longitude').value = lng;
  }

  var myCoords = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map2'), mapOptions);

  var marker = new google.maps.Marker({
    position: myCoords,
    animation: google.maps.Animation.DROP,
    map: map,
    draggable: true
  });

  // refresh marker position and recenter map on marker
  function refreshMarker(){
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    var myCoords = new google.maps.LatLng(lat, lng);
    marker.setPosition(myCoords);
    map.setCenter(marker.getPosition());
  }
  // when input values change call refreshMarker
  document.getElementById('place_latitude').onchange = refreshMarker;
  document.getElementById('place_longitude').onchange = refreshMarker;

  // when marker is dragged update input values
  marker.addListener('drag', function() {
    latlng = marker.getPosition();
    newlat=(Math.round(latlng.lat()*1000000))/1000000;
    newlng=(Math.round(latlng.lng()*1000000))/1000000;
    document.getElementById('place_latitude').value = newlat;
    document.getElementById('place_longitude').value = newlng;
  });

  // When drag ends, center (pan) the map on the marker position
  marker.addListener('dragend', function() {
    map.panTo(marker.getPosition());
  });

}
