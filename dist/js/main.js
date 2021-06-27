let userName = document.getElementById('#nameInput');
let userParty = document.getElementById('#partyInput');
let userEmail = document.getElementById('#emailInput');
let userDates = document.getElementById('#date-picker');


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
    $('#date-picker').click(function(){
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

