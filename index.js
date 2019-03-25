// IIFE (Imediately Invoked Function Expression)
(function () { 
var map;   
var randomCoord;
var pos;
var directionsService; 
var directionsDisplay; 
var infoWindow;
var drawingManager;
var mapStartCount = 0;
function aboutMap(){
    console.log("welcome to my app")
    initMap();
    $('.about').append("<p>This app functions on geolocation services. Please allow to move forward. </p>")

}
function fullMapOff(){
    $('#map').hide();
    $('#right-panel').hide();
    $('#get-lost-button').hide();
    $('#tutorial-button').hide();
    $('#floating-panel').hide();
}

function tutorialNavigation(){
    fullMapOff()
    instructionsPage();

}

function getLostButton(){
        $('#yes-button').on('click', function(){
            if(mapStartCount>0){
                $('.about').hide();
                $('#map').show();
                $('#right-panel').show();
                $('#get-lost-button').show();
                $('#tutorial-button').show();
                $('#floating-panel').show();
        }else{
            $('.about').hide();
            $('#map').show();
        }
    });
}
function instructionsPage(){
    console.log("how you use this"); 
    $('.about').replaceWith(
        `<section class='about'>   
        <img class="gif-left" src="squareExample.gif" alt="example of drawing tool" style="align-self:center">
        <p>You can use the square drawing tool to select an area to get lost within on the map.</p> 
        <img class="gif-right" src="squareGetLost.gif" alt="example of the get lost button" style="align-self:center">
        <p>A button to get lost will apear when you have drawn the area.You can edit the area with the hand tool before clicking the get lost button. After you click on the "get lost" button the directions and route will show.</p>
        <img class="gif-left" src="squareNewRoute.gif" alt="example of how to use new route" style="align-self:center">
        <p>The travel mode can be edited with the drop down menu. You can use the small "get lost" button to give you a new random route</p> 
        <button type="button" class="btn draw-border" id="yes-button" style="align-self:center">get lost</button>
        </section>`);
    $('.about').show(); 
    getLostButton();
    
}

function enterMap(){
    $('#yes-button').on('click', function(){
        $('.open-question').hide("slow");
        instructionsPage();
    })
    $('#no-button').on('click', function(){
        $('.open-question').hide("slow");
        $('.on-no-page').show("slow");
    })
    $('#yes-button-two').on('click', function(){
        $('.on-no-page').hide("slow");
        instructionsPage();
        
    })
    $('#get-lost-again').on('click', function(){
        $('#map').hide('slow');
        $('.on-no-page').show('slow');
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
        styles:[
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#165c64"
                    },
                    {
                        "saturation": 34
                    },
                    {
                        "lightness": -69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#b7caaa"
                    },
                    {
                        "saturation": -14
                    },
                    {
                        "lightness": -18
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#cbdac1"
                    },
                    {
                        "saturation": -6
                    },
                    {
                        "lightness": -9
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#8d9b83"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -12
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#d4dad0"
                    },
                    {
                        "saturation": -88
                    },
                    {
                        "lightness": 54
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -3
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#c17118"
                    },
                    {
                        "saturation": 61
                    },
                    {
                        "lightness": -45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#8ba975"
                    },
                    {
                        "saturation": -46
                    },
                    {
                        "lightness": -28
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#a43218"
                    },
                    {
                        "saturation": 74
                    },
                    {
                        "lightness": -51
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#3a3935"
                    },
                    {
                        "saturation": 5
                    },
                    {
                        "lightness": -57
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#cba923"
                    },
                    {
                        "saturation": 50
                    },
                    {
                        "lightness": -46
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]

        


    });

    //define infoWindow to say current location at the current location 
    infoWindow = new google.maps.InfoWindow;

    // try HTML5 geolocation
    if (navigator.geolocation) {
        // getCurrentPosition allows you to gather position information from the browser
        navigator.geolocation.getCurrentPosition(function(position){

            // this is the point you can see if geoLocation was allowed
            console.log("geolocation allowed")
            $('.about').hide();
            $('.open-question').show();
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
        $('#get-lost-button').show("slow");
        
        // get-lost button event listner
        $(".ui-container").on("click", '#get-lost-button', function() {

            //lets you know it ran
            mapStartCount++;
            
            //get lost button, change sizing and position
            $('#get-lost-button').toggleClass('get-lost-again',true);
            $('#get-lost-button').removeClass('get-lost-button');
            //manage tutorial button
            $('#tutorial-button').show();
            $('.ui-container').on('click','#tutorial-button', function(){
                tutorialNavigation();
            })
            //hide rectangle
            rectangle.setMap(null);
            //hide drawingManager
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
            $('#floating-panel').show("slow");


         
            // rightPanelResponsive();
            $('#right-panel').show("slow"); 
            // $('#get-lost-again').show("slow");
           
       
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
google.maps.event.addDomListener(window, 'load', aboutMap);
})();