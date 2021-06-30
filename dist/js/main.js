let userName = document.getElementById('#nameInput');
let userParty = document.getElementById('#partyInput');
let userEmail = document.getElementById('#emailInput');
let userDates = document.getElementById('#date-picker');

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

const locations = {
    auckland: {
      name: 'Auckland',
      lat: -36.8509,
      lng: 174.7645,
    },
    whangarei: {
      name: 'Whangarei',
      lat: -35.7275,
      lng: 174.3166,
    },
    hamilton: {
      name: 'Hamilton',
      lat: -37.7826,
      lng: 175.2528,
    },
    tauranga: {
      name: 'Tauranga',
      lat: -37.7476,
      lng: 176.1220,
    },
    rotorua: {
      name: 'Rotorua',
      lat: -38.1446,
      lng: 176.2378,
    },
    gisborne: {
      name: 'Gisborne',
      lat: -38.6641,
      lng: 178.0228,
    },
    napier: {
      name: 'Napier',
      lat: -39.5109,
      lng: 176.8764,
    },
    newPlymouth: {
      name: 'New Plymouth',
      lat: -39.0572,
      lng: 174.0794,
    },
    palmerstonNorth: {
      name: 'Palmerston North',
      lat: -40.3545,
      lng: 175.6097,
    },
    wellington: {
      name: 'Wellington',
      lat: -41.2924,
      lng: 174.7787,
    },
    nelson: {
      name: 'Nelson',
      lat: -41.2985,
      lng: 173.2444,
    },
    greymouth: {
      name: 'Greymouth',
      lat: -42.4614,
      lng: 171.1985,
    },
    christchurch: {
      name: 'Christchurch',
      lat: -43.5320,
      lng: 172.6306,
    },
    dunedin: {
      name: 'Dunedin',
      lat: -45.8795,
      lng: 170.5006,
    },
    queenstown: {
      name: 'Queenstown',
      lat: -45.0302,
      lng: 168.6615,
    },
    invercargill: {
      name: 'Invercargill',
      lat: -46.4179,
      lng: 168.3615,
    },
};

const dateOptions = {
    // altInput: true,
    // altFormat: "F j, Y",
    dateFormat: "F j, Y",
    maxDate: new Date().fp_incr(14),
    mode: "range",    
    
    onClose: function(dates, string, picker){
        $('#selected-dates').text(string);
        userDates = $('#date-picker').val();
        
        calcDateRange();
    }
}

const wayPoints = [];

let routeControl;

function init() {
    initDropdowns();
    assignUserInputsToVariables();
    routeControl = L.Routing.control({
       waypoints: [null],
       router: L.Routing.mapbox('pk.eyJ1Ijoia2lsaW1hbmphcm8iLCJhIjoiY2tjMDJpMDc2MHFoeDJ6cjVzajF6YmFiZSJ9.r9QBATh6AyTUkCLNjykuxw'),
    });
   routeControl.addTo(map);
   calculateDistance();
};

function initDropdowns() {
    Object.keys(locations).forEach((key) => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = key;
      option2.value = key;
      option1.text = locations[key].name;
      option2.text = locations[key].name;
      $('#departure-location').append(option1);
      $('#arrival-location').append(option2);
    });
    $('#departure-location').change(departureChange);
    $('#arrival-location').change(arrivalChange);
};

function assignUserInputsToVariables(){
    $('#nameInput').keyup(function(){
        userName = $('#nameInput').val();
    })
    $('#partyInput').keyup(function(){
        userParty = parseInt($('#partyInput').val());
    })
    $('#emailInput').click(function(){
        userEmail = $('#emailInput').val();
    })
};

function calculateDistance(){
    routeControl.on('routesfound', (e) => {
        let getDistanceData = e.routes[0].summary.totalDistance;
        const distanceInKm = Math.floor(getDistanceData / 1000);
        // $('#length-of-trip-km').text(`${distanceInKm}KM`);
    });
};


function calcDateRange(){
    let daysInRange = document.getElementsByClassName('inRange');
    let numberOfDays = daysInRange.length + 1;
};

$('#date-picker').flatpickr(dateOptions);

const mapConfig = {
    zoomSnap: 0.2,
};
  
const map = L.map('map', mapConfig).fitBounds(L.latLngBounds(L.latLng({
    lng: 179.243,
    lat: -33.490,
  }), 
  L.latLng({
    lng: 164.924,
    lat: -47.600,
  }))
);
  
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map);
  
function mapRouting() {
    routeControl.setWaypoints(wayPoints);
};

function departureChange() {
    const city = locations[this.value];
    wayPoints[0] = {
      lat: city.lat,
      lng: city.lng,
    };
    mapRouting();
};
function arrivalChange() {
    const city = locations[this.value];
    wayPoints[1] = {
      lat: city.lat,
      lng: city.lng,
    };
    mapRouting();
};

init();