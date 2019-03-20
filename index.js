// IIFE (Imediately Invoked Function Expression)
(function () { 
var map;   
var randomCoord;
var pos;
var directionsService; 
var directionsDisplay; 
var infoWindow;
var drawingManager;

function enterMap(){
    $('#yes-button').on('click', function(){
        $('.open-question').toggleClass("hidden");
        $('#map').toggleClass("hidden", false);
    })
    $('#no-button').on('click', function(){
        $('.open-question').toggleClass("hidden");
        $('.on-no-page').toggleClass("hidden", false);
    })
    $('#yes-button-two').on('click', function(){
        $('.on-no-page').toggleClass("hidden");
        $('#map').toggleClass("hidden", false);
    })
}
function initMap() {

    //direction services 
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    
    // set value a map variable to the map you want to render
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 180},
        //default zoom 
        zoom: 12,
        // mapTypeId 
        mapTypeId: 'terrain',
        mapTypeControl: false,
        fullscreenControl: false,
        streetviewContral: false,
        //disable default UI false shows default UI this can be set to true later via event listner
        disableDefaultUI: false,

    });

    //define infoWindow to say current location at the current location 
    infoWindow = new google.maps.InfoWindow;

    // try HTML5 geolocation
    if (navigator.geolocation) {
        // getCurrentPosition allows you to gather position information from the browser
        navigator.geolocation.getCurrentPosition(function(position){
            // makes an object to store current position latitude and longitude 
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infowindow for geolocation center
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);

            //set center of map to current position
            map.setCenter(pos);
            //drawing manager function is called here
            drawingInterface();
        }, function(){
            //error handling for geolocation
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        //error handling for geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    };
}

// this will render the drawingManager UI 
function drawingInterface() {
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['rectangle']
        },
        
       // edit options and styling for rectangle here  
        rectangleOptions: {
            editable: true
        }

    });   

    //render drawing manager and drawings on map
    drawingManager.setMap(map);
    //render directions
    directionsDisplay.setMap(map);
    //render direction panel 
    directionsDisplay.setPanel(document.getElementById('right-panel'));


    //event listner for when a rectangle is drawn
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {

        
        //hide infowindow at geolocation
        infoWindow.setMap(null);

        // this is just a check to see .getBounds() of that rectangle 
        var maxLat = rectangle.getBounds().getNorthEast().lat();
        var minLat = rectangle.getBounds().getSouthWest().lat();
        var minLng = rectangle.getBounds().getNorthEast().lng();
        var maxLng = rectangle.getBounds().getSouthWest().lng();

        //when bounds change get new bounds latlng values from api
        rectangle.addListener('bounds_changed', function(event){
            maxLat = rectangle.getBounds().getNorthEast().lat();
            minLat = rectangle.getBounds().getSouthWest().lat();
            minLng = rectangle.getBounds().getNorthEast().lng();
            maxLng = rectangle.getBounds().getSouthWest().lng();
        });  

       //toggle visibilty of the get-lost-button
        $('#get-lost-button').toggleClass("hidden", false);
        
        // get-lost button event listner
        $(".container").on("click", '#get-lost-button', function() {
            //lets you know it ran
            console.log(`getLostClick, ran`);
            
            //get lost button hidden
            $('#get-lost-button').toggleClass("hidden");

            //hide rectangle
            rectangle.setMap(null);

            drawingManager.setMap(null);
            //random number
            var randomNum = Math.random();
            console.log(randomNum);

            //get random latitude from the .getBounds()
            var randomLat = randomNum* (maxLat - minLat) + minLat;

            // get random longititude from the .getBounds()
            var randomLng = randomNum * (maxLng - minLng) + minLng;
            console.log(randomLat);
            console.log(randomLng);
            // combine those random coordinates into usable .LatLng()
            randomCoord = new google.maps.LatLng(randomLat, randomLng);
            
            //show direction type select
            $('#floating-panel').toggleClass("hidden", false);

            //show the directions panel
            $('#right-panel').toggleClass("hidden", false);  
       
            //call route function 
            calculateAndDisplayRoute(directionsService, directionsDisplay);

            //event listner to change the route mode 
            document.getElementById('mode').addEventListener('change', function() {
                //runs new route api call 
                calculateAndDisplayRoute(directionsService, directionsDisplay);
              });
        });
    });
};

//uses googles direction services     
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    directionsService.route({
        //center pos via geolocation sevices 
        origin: pos,
        // random cordinate
        destination: randomCoord,
        // direction mode selectable
        travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
        if (status === 'OK') {
           
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}   

$(enterMap())
// loads event listner for the page loading 
google.maps.event.addDomListener(window, 'load', initMap);
})();