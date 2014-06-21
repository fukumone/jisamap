// Google Map APIの処理
function initialize() {
  var tokyo = new google.maps.LatLng(35.689614,139.691585);
  var myOptions = {
    zoom: 4,
    center: tokyo,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  };
  // var styles = [
  //   {
  //     stylers: [
  //       { hue: "#00ffe6" },
  //       { saturation: -20 }
  //     ]
  //   },{
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [
  //       { lightness: 100 },
  //       { visibility: "simplified" }
  //     ]
  //   },{
  //     featureType: "road",
  //     elementType: "labels",
  //     stylers: [
  //       { visibility: "off" }
  //     ]
  //   }
  // ];
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  // map.setOptions({styles: styles});
}

window.onload = function(){
  initialize();
};

