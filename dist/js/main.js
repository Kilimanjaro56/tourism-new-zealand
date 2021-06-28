const userName = document.getElementById('#nameInput');
const userParty = document.getElementById('#partyInput');
const userEmail = document.getElementById('#emailInput');
const userDates = document.getElementById('#date-picker');

const vehicles =[
    {
        type: "Motorbike",
        people:1,
        pricePerDay: 109,
        minDays:1,
        maxDays:5,
        per100KM:3.7,
    },
    {
        type: "Small Car",
        people:[1, 2],
        pricePerDay:129,
        minDays:1,
        maxDays:10,
        per100KM:8.5,
    },
    {
        type: "Large Car",
        people:[1, 5],
        pricePerDay:144,
        minDays:3,
        maxDays:10,
        per100KM:9.7,
    },
    {
        type: "Motor Home",
        people:[1, 6],
        pricePerDay:200,
        minDays:2,
        maxDays:15,
        per100KM:17,
    }
]

//Date and Map Variables
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
const firstLocation = document.getElementById('#testingforr').val();
const endLocation = document.getElementById('#testingforrr').val();


function init (){
    assignUserInputsToVariables();
}

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

$('#date-picker').flatpickr(dateOptions);

let map = L.map('mapid').setView([-42.032974, 173.320313], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let osm=new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(firstLocation),
        L.latLng(endLocation)
    ]
}).addTo(map);

L.Control.geocoder().addTo(map);
L.Control.geocoder().addTo(map);



init();