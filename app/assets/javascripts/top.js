// Google Map APIの処理
var map;
function initialize() {
  var tokyo = new google.maps.LatLng(35.689614,139.691585);
  var myOptions = {
    zoom: 3,
    center: tokyo,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };
  var styles = [
    {
        "featureType": "water",
        "stylers": [
            {
                "saturation": 43
            },
            {
                "lightness": -11
            },
            {
                "hue": "#0088ff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "lightness": 54
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ece2d9"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ccdca1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#767676"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b8cb93"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    }
  ]
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  map.setOptions({styles: styles});
  setClickEvent(map);
}

function setClickEvent(map)
{
  google.maps.event.addListener(map, 'click', function(event) {
    var requestUrl =
        'https://maps.googleapis.com/maps/api/timezone/' +
        'json' +
        '?location=' + event.latLng.lat() + ',' + event.latLng.lng() +
        '&timestamp=' + getTimeStamp(new Date().getTime()) +
        '&sensor=' + 'false' +
        '&language=' + 'ja';

    //request timezone
    $.ajax({
        url: requestUrl,
        type: 'GET',
        success: function(timeZone) {
          if (timeZone['status'] == 'OK') {
              //add marker
              addMarker(event.latLng, timeZone, map);
          } else {
              //error
            alert('status:' + timeZone['status']);
          }
        }
    });
  });
}

function getTimeStamp(time)
{
  return Math.round(time / 1000);
}

function addMarker(latLng, timeZone, map)
{
  var contentString =
      '<div class="content">' +
      '<p>' + '緯度経度:　' + latLng + '</p>' +
      '<p>' + 'タイムゾーンID:　' + timeZone['timeZoneId'] + '</p>' +
      '<p>' + 'タイムゾーン名:　' + timeZone['timeZoneName'] + '</p>' +
      '<p>' + '時差:　' + timeZone['rawOffset']/3600 + '時間' + '</p>' +
      '<p>' + 'サマータイムによる時差:　' + timeZone['dstOffset']/3600 + '時間' + '</p>' +
      '</div>';

  //create infowindow
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  //create marker
  var marker = new google.maps.Marker({
    position:latLng
  });

  //set event
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  //set map
  marker.setMap(map);

  //open infowindow
  infowindow.open(map, marker);
  window.onclick = function(){
    marker.setMap(null);
    infowindow.close(map, marker);
  }
}

//initialize

window.onload = function(){
  initialize();
};
