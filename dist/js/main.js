let userName = document.getElementById('#nameInput');
let userParty = document.getElementById('#partyInput');
let userEmail = document.getElementById('#emailInput');
let userDates = document.getElementById('#date-picker');
const vehicleFilterButton = document.querySelector('#start-total-calc');

const vehicles =[
    {
        type: "Motorbike",
        minPeople:1,
        maxPeople:1,
        pricePerDay: 109,
        minDays:1,
        maxDays:5,
        per100KM:3.7,
        imgId:"motorcycle",
        arrayId:0,
    },
    {
        type: "Small Car",
        minpeople:1,
        maxpeople:2,
        pricePerDay:129,
        minDays:1,
        maxDays:10,
        per100KM:8.5,
        imgId:"small_car",
        arrayId:1,
    },
    {
        type: "Large Car",
        minPeople:1,
        maxPeople:5,
        pricePerDay:144,
        minDays:3,
        maxDays:10,
        per100KM:9.7,
        imgId:"large_car",
        arrayId:2,
    },
    {
        type: "Motor Home",
        minPeople:1,
        maxPeople:6,
        pricePerDay:200,
        minDays:2,
        maxDays:15,
        per100KM:17,
        imgId:"motorhome",
        arrayId:3,
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
    mode: "range", 
    // altInput: true,
    // altFormat: "F j, Y",
    dateFormat: "F j, Y",
    maxDate: new Date().fp_incr(50),
    // inline: true,   
    
    onChange: function(dates, string, picker){
        $('#selected-dates').text(string);
        userDates = $('#date-picker').val();
        
        calcDateRange();
        
        $('#selected-dates').text(string);
        if (dates[0]) {
            picker.set('maxDate', new Date(dates[0]).fp_incr(15));
        } else {
            picker.set('maxDate', '');
        }
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

   $('#vehicle-error').hide();

   calculateDistance();
   addFilterListener();

};

function initDropdowns() {
    Object.keys(locations).forEach((key) => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = key;
      option2.value = key;
      option1.text = locations[key].name;
      option2.text = locations[key].name;
      $('#start-location').append(option1);
      $('#end-location').append(option2);
    });
    $('#start-location').change(endChange);
    $('#end-location').change(startChange);
};

function assignUserInputsToVariables(){
    $('#nameInput').keyup(function(){
        userName = $('#nameInput').val();
    })
    $('#partyInput').keyup(function(){
        userParty = parseInt($('#partyInput').val());
    })
    $('#emailInput').keyup(function(){
        userEmail = $('#emailInput').val();
        finalHtmlDetailsInject();
    })
};

let travelDistance;

function calculateDistance(){
    routeControl.on('routesfound', (e) => {
        let getDistanceData = e.routes[0].summary.totalDistance;
        const distanceInKm = Math.floor(getDistanceData / 1000);
        travelDistance = distanceInKm
    });
};

let userDaysNumber

function calcDateRange(){
    let daysInRange = document.getElementsByClassName('inRange');
    userDaysNumber = daysInRange.length + 1;
    firstHtmlDetailsInject();
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
let endLocation;
let startLocation;

function startChange() {
    const city = locations[this.value];
    wayPoints[0] = {
        lat: city.lat,
        lng: city.lng,
    };
    mapRouting();
    startLocation = locations[this.value].name;
};
function endChange() {
    const city = locations[this.value];
    
    wayPoints[1] = {
        lat: city.lat,
        lng: city.lng,
    };
    endLocation = locations[this.value].name;
    mapRouting();
};

function displayVehicles(vehiclesArray){
    let html =``
   for( const vehicle of vehiclesArray){
        html += ` <img id="${vehicle.imgId}_vehicle" src="../assets/img/${vehicle.imgId}.png" data-id="${vehicle.arrayId}">`
    }
    $('#vehicle-display').html(html);

    addClickListnersToVehicles();
}
function addFilterListener(){
    $('#start-filtering-output').click(function(){
        filterVehicles();
        filterErrorMessage();
        console.log('NEXT TO FILTERED')
    });
    $('#location-confirm').click(validateLocations())
}

const filteredVehicles =[];
function filterVehicles(){
    for(const vehicle of vehicles){
        if(
            userDaysNumber >= vehicle.minDays &&
            userDaysNumber <= vehicle.maxDays&&
            userParty >= vehicle.minPeople &&
            userParty <= vehicle.maxPeople
        ){
            filteredVehicles.push(vehicle)
        }
    }
}
function filterErrorMessage(){
    if(filteredVehicles.length === 0){

        vehicleErrorMessage.style.display = "inline";
        $(vehicleFilterButton).hide();

        console.log("EMPTY")

    }else if(filteredVehicles.length > 0){

        displayVehicles(filteredVehicles);

        vehicleErrorMessage.style.display = "none";
        $(vehicleFilterButton).show();
        
        console.log("WE GOT EM")
    }
    
}


$('#start-filtering-output').hide();
function validateLocations(){
    $('#location-confirm').click(function(){
        if($('#start-location').val() === null || $('#end-location').val() === null){
            locationsErrorMessage.style.display = "inline";
            console.log("Error")
        }else{
            locationsErrorMessage.style.display = "none";
            console.log("NoError")
            $('#start-filtering-output').show();
        }
        
        mainHtmlDetailsInject();
        })

}
function addEventListeners(){
    userParty.addEventListener('blur', assignUserInputsToVariables());
    userName.addEventListener('blur', assignUserInputsToVariables());
}

$('.edit-button').click(function(){
    // userName = "";
    // userParty = 0;
    // userEmail = "";
    // userDates = 0;
    selectedVehicle = {};
    
    
    assignUserInputsToVariables();
    filterVehicles();
    // filterErrorMessage();
    
})

$('#nav-items').toggleClass("hide");
$('#nav-bars').click(function(){
    $('#nav-items').toggleClass("hide");
    $('#nav-items').toggleClass("show");
})



//Error Inits

const locationsErrorMessage = document.querySelector("#locations-error-message");
locationsErrorMessage.style.display = "none";

const vehicleErrorMessage = document.querySelector("#vehicle-error-message");
vehicleErrorMessage.style.display = "none";


const detailsForm = document.querySelector('#details-form');

const emailInput = document.querySelector("#emailInput");
const emailErrorMessage = document.querySelector("#email-error-message");
emailErrorMessage.style.display = "none";

const nameInput = document.querySelector("#nameInput");
const nameErrorMessage = document.querySelector("#name-error-message");
nameErrorMessage.style.display = "none";

const partyInput = document.querySelector("#partyInput");
const partyErrorMessage = document.querySelector("#party-error-message");
partyErrorMessage.style.display = "none";

let isDetailsError;

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailRegex.test(emailInput.value)) {
        emailErrorMessage.style.display = "inline";
        isError = true;
    } else {
        emailErrorMessage.style.display = "none";
    }
}

function checkName() {
    const nameRegex = /^[a-z ,.'-]+$/i
    if(!nameRegex.test(nameInput.value)) {
        nameErrorMessage.style.display = "inline";
        nameInput.style.background = "red";
        isError = true;
    } else {
        nameInput.style.background = "white";
        nameErrorMessage.style.display = "none";
    }
}
function checkParty() {
    const partyRegex = /^[1-6]*$/
    if(!partyRegex.test(partyInput.value)) {
        partyErrorMessage.style.display = "inline";
        partyInput.style.background = "red";
        isError = true;
       
    } else {
        partyInput.style.background = "white";
        partyErrorMessage.style.display = "none";
    }
}

function validateDetails(event) {
    event.preventDefault();
    isDetailsError = false;
    checkName();
    checkParty();
    if (isDetailsError) {
        console.log("error");
        // no submit
    } else {
        console.log("no error");
        window.location ="#location-page-one"
    }
}

detailsForm.addEventListener('submit', validateDetails);
emailInput.addEventListener('blur', checkEmail);
nameInput.addEventListener('blur', checkName);
partyInput.addEventListener('blur', checkParty);


let selectedVehicle;

function addClickListnersToVehicles(){

    $("#vehicle-display img").click(function(){
        
    const selectedVehicleId = $(this).addClass('showSelected').data('id');
    selectedVehicle =  vehicles[selectedVehicleId];

    $('#vehicle-display img').click(function(){
        calculateTotalPrices();
    });
    })
};

let estimatedFuel;
let rentalCost;


function calculateTotalPrices(){
    estimatedFuel = Math.floor((travelDistance / 100) * selectedVehicle.per100KM)
    console.log(estimatedFuel + "L")

    rentalCost = (userDaysNumber * selectedVehicle.pricePerDay)
    console.log(rentalCost)
    $('#start-total-calc').click(
    showVehicleTotals());

};

function showVehicleTotals(){
    let html = `<h5>Your Selection</h5>
    <p>${selectedVehicle.type}: $${selectedVehicle.pricePerDay} <span>(per day)</span></p>
    <p>Rental Cost: $${rentalCost}</p>
    <p>Estimated Fuel Consumption: ${estimatedFuel}L</p>`
    $('.your-vehicle-details').html(html)
    lastHtmlDetailsInject();
}
function firstHtmlDetailsInject(){
    let html = `<h5>Your Details</h5>
    <p>${userName}</p>
    <p>${userDates}</p>
    <p>${userDaysNumber} day(s)</p>
    <p>Number of People: ${userParty}</p>`


        $("#first-html-details").click(function(){
        $('#first-details').html(html)
    })}
    
function mainHtmlDetailsInject(){
        let html = ``
        html = `<h5>Your Details</h5>
    <p>${userName}</p>
    <p>${userDates}</p>
    <p>${userDaysNumber} day(s)</p>
    <p>Number of People: ${userParty}</p>
    <p>Start: ${startLocation}</p>
    <p>End: ${endLocation}</p>`

        $('#start-filtering-output').click(function(){
        $("#your-details-one").html(html)
    })
}
    
function lastHtmlDetailsInject(){
        let html = `<h5>Your Details</h5>
    <p>${userName}</p>
    <p>${userDates}</p>
    <p>${userDaysNumber} day(s)</p>
    <p>Number of People: ${userParty}</p>
    <p>Start: ${startLocation}</p>
    <p>End: ${endLocation}</p>
    <h5>Your Selection</h5>
    <p>${selectedVehicle.type}: $${selectedVehicle.pricePerDay} <span>(per day)</span></p>
    <p>Rental Cost: $${rentalCost}</p>
    <p>Estimated Fuel Consumption: ${estimatedFuel}L</p>`

        $("#start-total-calc").click(function(){
        $('#last-details').html(html)
    })}

    function finalHtmlDetailsInject(){
        let html = `<h5>Thanks ${userName}!</h5>
    <p>Further information has been sent to ${userEmail}</p>
    <h5>Your Booking Details</h5>
    <p>${userDates}</p>
    <p>${userDaysNumber} day(s)</p>
    <p>Number of People: ${userParty}</p>
    <p>Start: ${startLocation}</p>
    <p>End: ${endLocation}</p>
    <h5>Your Vehicle</h5>
    <p>${selectedVehicle.type}: $${selectedVehicle.pricePerDay} <span>(per day)</span></p>
    <p>Rental Cost: $${rentalCost}</p>
    <p>Estimated Fuel Consumption: ${estimatedFuel}L</p>`

        $("#submit-button").click(function(){
        $('#final-details').html(html)
    })}

    const paymentForm = document.querySelector('#payment-form');

    const cardNumberInput = document.querySelector("#input-cardnumber");
    const cardNumberErrorMessage = document.querySelector("#cardnumber-error-message");
    cardNumberErrorMessage.style.display = "none";
    
    const expDateInput = document.querySelector("#input-expdate");
    const expDateErrorMessage = document.querySelector("#expdate-error-message");
    expDateErrorMessage.style.display = "none";
    
    const cardNameInput = document.querySelector("#input-cardname");
    const cvcInput = document.querySelector("#input-cvc");
    const cvcErrorMessage = document.querySelector("#cvc-error-message");
    cvcErrorMessage.style.display = "none";
    
    let hasError;
    
    
    function validatePayment(event) {
        event.preventDefault(); 
        hasError = false;
        checkCardNumber();
        checkExpDate();
        checkCvc();
        
        if (hasError) {
            console.log("error");
        } else {
            console.log("no error");

            cardNumberInput.value = ''
            cardNameInput.value = ''
            expDateInput.value = ''
            cvcInput.value = ''
            window.location ="#booking-confirmation-page"
            

        }
        
    }
    
    function checkCardNumber() {
        const cardNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        if(!cardNumberRegex.test(cardNumberInput.value)) { 
            cardNumberErrorMessage.style.display = "inline"; 
            hasError = true; 
        } else {
            cardNumberErrorMessage.style.display = "none";
        }
    }
    
  
    
    function checkExpDate() {
        const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        if(!expRegex.test(expDateInput.value)) {
            expDateErrorMessage.style.display = "inline";
            hasError = true;
        } else {
            expDateErrorMessage.style.display = "none";
        }
    }

    
    function checkCvc() {
        const cvcRegex = /^[0-9]{3,4}$/;
        if(!cvcRegex.test(cvcInput.value)) {
            cvcErrorMessage.style.display = "inline";
            hasError = true;
        } else {
            cvcErrorMessage.style.display = "none";
        }
    }
   
    
    
    
    paymentForm.addEventListener('submit', validatePayment);
    
    cardNumberInput.addEventListener('blur', checkCardNumber);
    expDateInput.addEventListener('blur', checkExpDate);
    cvcInput.addEventListener('blur', checkCvc);
    
    
    



init();