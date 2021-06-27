let userName = document.getElementById('#nameInput');
let userParty = document.getElementById('#partyInput');


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


        // is called by the picker closing event. Is passed three arguments, an array of Date objects,
        // a string representing the selected dates in human readable format as defined by the options,
        // the datepickr object attached to the specific input that triggered the event
        function displaySelectedDates(selection, strings, instance) {
            console.log(selection[0].toString()); // get the first element in the array of dates and stringify it into the console
            $("#start").html(strings); // insert the string representing the selceted dates into the DOM
        }
        $(".datepicker").flatpickr({ // activate the plugin on this element
            mode: "range",    // set it to range mode to allow selection of a range of dates
            dateFormat: "F j, Y", // specify the format that the date strings should have
            minDate: "today", // specify the earliest date allowed
            // maxDate: new Date().fp_incr(14), // specify the latest date allowed (14 days from now)
            onClose: displaySelectedDates, // whent he picker is closed, execute a callback function
        });