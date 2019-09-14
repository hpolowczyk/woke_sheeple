// from data.js
var alienData = data;

/////////////////////////////////////////////////////////////////////////////
// Create the table using all the provided data
/////////////////////////////////////////////////////////////////////////////

// Reference to table body
var tbody = d3.select("tbody");

// Using a for-loop, create a function using arrows
alienData.forEach((alienSighting) => {
    // Append a new table row 
    var row=tbody.append("tr");
    // Use Object.entries to get each key,value pair in the data
    Object.entries(alienSighting).forEach(([key,value]) => {
        // Append a cell to the table row for each object
        var cell = row.append("td");
        // For cleaner readibility, capitalize both state and country
        if (key == 'state' || key == 'country' ) {
            // Capitalize the entire word
            var val = value.toUpperCase();
            // Update cell's text
            cell.text(val);
        }
        // For city, capitalize the first letter 
        else if (key == 'city') {
            if(value.includes('(')) {
                // Split the words by space and bracket, capitalize the first letter and use the remaining string, then rejoin the string
                var val = value.split(' (').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' (');
            }
            else {
                // Split the words by space, capitalize the first letter and use the remaining string, then rejoin using a space
                var val = value.split(' ').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' ');
            }
            // Update cell's text
            cell.text(val);
        }
        else {
            // Update cell's text
            cell.text(value);
        }
    })
});

/////////////////////////////////////////////////////////////////////////////
// Create dropdown menus for state, country and shape
/////////////////////////////////////////////////////////////////////////////

// Retrieve all unique states
var states = [...new Set(alienData.map(alienData => alienData.state))];
// Reference select id for state dropdown
var selectState = document.getElementById("state");

// Using a for-loop, create a function to create dropdown for states
states.forEach((state) => {
    // Create option element
    var opt = document.createElement("option");
    // Set value to state name
    opt.value = state;
    // Set text to state name (capitalized)
    opt.text = state.toUpperCase();
    // Append option element to selectState 
    selectState.appendChild(opt);
});

// Use a similar process for countries and shapes as done for states
//// COUNTRIES
var countries = [...new Set(alienData.map(alienData => alienData.country))];
var selectCountry = document.getElementById("country");

countries.forEach((country) => {
    var opt = document.createElement("option");
    opt.value = country;
    opt.text = country.toUpperCase();
    selectCountry.appendChild(opt);
});

//// SHAPES
var shapes = [...new Set(alienData.map(alienData => alienData.shape))];
var selectShape = document.getElementById("shape");

shapes.forEach((shape) => {
    var opt = document.createElement("option");
    opt.value = shape;
    opt.text = shape;
    selectShape.appendChild(opt);
});

/////////////////////////////////////////////////////////////////////////////
// Create the filtered table for all five search categories
/////////////////////////////////////////////////////////////////////////////

// Select the button
var button = d3.select("#filter-btn")

// Use .on to create filtering functionality 
button.on("click", () => {
    // Select the user inputted date
    var inputDate = d3.select("#datetime");
    // Reference the inputted value
    var dateValue = inputDate.property("value");

    var inputCity = d3.select("#city");
    var cityValue = inputCity.property("value");

    var inputState = d3.select("#state");
    var stateValue = inputState.property("value");

    var inputCountry = d3.select("#country");
    var countryValue = inputCountry.property("value");

    var inputShape = d3.select("#shape");
    var shapeValue = inputShape.property("value");

    // Using ternary operators, filter the data to ensure that only data corresponding to the inputted values is being used
    var filteredData = alienData.filter(ad =>   ((dateValue ? ad.datetime === dateValue : true) && 
                                                (cityValue ? ad.city === cityValue.toLowerCase() : true) &&
                                                (stateValue ? ad.state === stateValue : true) &&
                                                (countryValue ? ad.country === countryValue : true) &&
                                                (shapeValue ? ad.shape === shapeValue : true)));
    // To filter the table, first remove all previous rows
    tbody.html("");
    // Adapt the code used to generate the complete table using the filtered data from above
    filteredData.forEach((alienSighting) => {
        var row=tbody.append("tr");
        Object.entries(alienSighting).forEach(([key,value]) => {
        var cell = row.append("td");
            if (key == 'state' || key == 'country' ) {
                var val = value.toUpperCase();
                cell.text(val);
            }
            else if (key == 'city') {
                if(value.includes('(')) {
                    var val = value.split(' (').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' (');
                }
                else {
                    var val = value.split(' ').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' ');
                }
                cell.text(val);
            }
            else {
                cell.text(value);
            }
        })
    })
});