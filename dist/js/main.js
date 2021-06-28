const userName = document.getElementById('#nameInput');
const userParty = document.getElementById('#partyInput');
const userEmail = document.getElementById('#emailInput');
const userDates = document.getElementById('#date-picker');

function assignUserInputsToVariables(){
    $('#nameButton').click(function(){
        userName = $('#nameInput').val();
        console.log(userName)
    })
    $('#partyButton').click(function(){
        userParty = parseInt($('#partyInput').val());
        console.log(userParty)
    })
    $('#emailButton').click(function(){
        userEmail = $('#emailInput').val();
        console.log(userEmail)
    })
}
assignUserInputsToVariables();


const dateOptions = {
    // altInput: true,
    // altFormat: "F j, Y",
    dateFormat: "F j, Y",
    maxDate: new Date().fp_incr(14),
    mode: "range",    
    onClose: function(dates, string, picker){
        $('#selected-dates').text(string);
        userDates = $('#date-picker').val();
        console.log(userDates)
        
    }
}

$('#date-picker').flatpickr(dateOptions);

var map = L.map('mapid').setView([-42.032974, 173.320313], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var osm=new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

L.Control.geocoder().addTo(map);
L.Control.geocoder().addTo(map);

const firstLocation = document.getElementById('#testingforr').val();
const endLocation = document.getElementById('#testingforrr').val();

L.Routing.control({
    waypoints: [
      L.latLng(firstLocation),
      L.latLng(endLocation)
    ]
  }).addTo(map);
