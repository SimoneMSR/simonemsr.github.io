

      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {"lng":41.82, "lat":15.51},
          mapTypeId : "satellite"
        });

        infoWindow = new google.maps.InfoWindow;

        showLayers(map);
        addLayer();
        //showCurrentPosition();
        moveToCurrentPosition();
        showTracker();
      }

      function addLayer(){
        var particelle = new WmsMapType(
        "Particelle Catastali",
        "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
        {layers: "CP.CadastralParcel",
      SR : "EPSG:6706"},
        {opacity: 0.5});


        particelle.addToMap(map);
        //map.overlayMapTypes.getArray()[0].setOpacity(0.5);
      }

      function moveToCurrentPosition(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          });
        }
      }

      function showCurrentPosition(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      function showLayers(map){
          getData("assets/prova.geojson").then((data) => {
            data = JSON.parse(data);
            for(var feature of data.features){
              var fillColor = feature.id == 'mandrile' ? "#FFFF00" : '#FF0000';
              var path = new google.maps.Polygon({paths : convertArrayCoordinates(feature.geometry.coordinates[0]),
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 3,
                  fillColor: fillColor,
          fillOpacity: 0.35});
          path.setMap(map);
          }



        });
      }

      function showTracker(){
           var watchID = null;
           var pos = {"lng":123.61, "lat":-22.14};
           var infoWindow=new google.maps.InfoWindow({ content: "", 
                                                               position: pos});

                           var markerOptn={
              position:pos,
              map:map,
              title:"Tua posizione",
              animation:google.maps.Animation.DROP
                };
               
                var marker=new google.maps.Marker(markerOptn);
                map.setZoom(19);
           google.maps.event.addListener(marker, "click", function(){
            infoWindow.setPosition(marker.getPosition());
                  infoWindow.open(map);
                });   
              
                var optn = {
              enableHighAccuracy: true,
                    timeout: Infinity,
                    maximumAge: 0 
                  };
                if( navigator.geolocation )
                 navigator.geolocation.watchPosition(success, fail, optn);
                else
                 handleLocationError(false, infoWindow, map.getCenter());

               
              function success(position)
              {
                var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
                          position.coords.longitude);
                updateMarker(googleLatLng , 
                                "LAT: " + googleLatLng.lat() + " LON:" + googleLatLng.lng());
              }
               
              function updateMarker(googleLatLng, content){

               
                var infoWindow=new google.maps.InfoWindow({ content: content, 
                                                               position: googleLatLng});
                marker.setPosition(googleLatLng);
                                         
              }
               
              function fail(error)
              {
                var errorType={
              0:"Unknown Error",
              1:"Permission denied by the user",
              2:"Position of the user not available",
              3:"Request timed out"
                };
               
                var errMsg = errorType[error.code];
               
                if(error.code == 0 || error.code == 2){
                  errMsg = errMsg+" - "+error.message;
                }
               
                $("p").html(errMsg);
              }
      }

      function getData(path, callback) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // The request is done; did it work?
                if (xhr.status == 200) {
                    // Yes, use `xhr.responseText` to resolve the promise
                    resolve(xhr.responseText);
                } else {
                    // No, reject the promise
                    reject(xhr);
                }
             }
        };
        xhr.open("GET", path);
        xhr.send();
    });
}

function convertArrayCoordinates(array){
  var retval = [];
  for(var coordinate of array) 
    retval.push({"lng" : coordinate[0], "lat" : coordinate[1]});
  return retval;
}
