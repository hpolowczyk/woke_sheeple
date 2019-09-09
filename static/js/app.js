// from data.js
var alienData = data;

//// Input data into the table body ////

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
        // Use d3 to update the cell's text
        cell.text(value);
    })
})

//// Create a date/time filter ////

// Select the button
//var button = d3.select("#filter-btn")

// Use .on to create filtering functionality 
//button.on("click", () => {
    // Select the user inputted date
 //   var inputDate = d3.select("#datetime");
    // Reference the inputted value
 //   var inputValue = inputDate.property("value");
    // Use .filter to filter based on the input value
 //   var filteredData = alienData.filter(alienData => alienData.datetime === inputValue);
    // Use console.log to check if the above filter worked
 //   console.log(filteredData);
    // To filter the table, first remove all previous rows
 //   tbody.html("");
    // Using the table function from above, swap all the data for the filtered data
 //   filteredData.forEach((alienSighting) => {
  //      var row=tbody.append("tr");
   //     Object.entries(alienSighting).forEach(([key,value]) => {
    //        var cell = row.append("td");
     //       cell.text(value);
     //   })
  //  })
//})

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
    // Set text to state name
    opt.text = state;
    // Append option element to selectState 
    selectState.appendChild(opt);
});

// Retrieve all unique countries
var countries = [...new Set(alienData.map(alienData => alienData.country))];
// Reference select id for state dropdown
var selectCountry = document.getElementById("country");

// Using a for-loop, create a function to create dropdown for countries
countries.forEach((country) => {
    var opt = document.createElement("option");
    opt.value = country;
    opt.text = country;
    selectCountry.appendChild(opt);
});

// Retrieve all unique countries
var shapes = [...new Set(alienData.map(alienData => alienData.shape))];
// Reference select id for state dropdown
var selectShape = document.getElementById("shape");

// Using a for-loop, create a function to create dropdown for countries
shapes.forEach((shape) => {
    var opt = document.createElement("option");
    opt.value = shape;
    opt.text = shape;
    selectShape.appendChild(opt);
});

// Select the button
var button = d3.select("#filter-btn")

// Use .on to create filtering functionality 
button.on("click", () => {
    var inputDate = d3.select("#datetime");
    var dateValue = inputDate.property("value");

    var inputCity = d3.select("#city");
    var cityValue = inputCity.property("value");

    var inputState = d3.select("#state");
    var stateValue = inputState.property("value");

    var inputCountry = d3.select("#country");
    var countryValue = inputCountry.property("value");

    var inputShape = d3.select("#shape");
    var shapeValue = inputShape.property("value");

    if (dateValue != "" && cityValue == "" && stateValue == "" && countryValue == "" && shapeValue == "") {
        var filteredData = alienData.filter(alienData => alienData.datetime == dateValue);
    }
    else if (dateValue == "" && cityValue != "" && stateValue == "" && countryValue == "" && shapeValue == "") {
        var filteredData = alienData.filter(alienData => alienData.city == cityValue);
    }
    else if (dateValue == "" && cityValue == "" && stateValue != "" && countryValue == "" && shapeValue == "") {
        var filteredData = alienData.filter(alienData => alienData.state == stateValue);
    }
    else if (dateValue == "" && cityValue == "" && stateValue == "" && countryValue != "" && shapeValue == "") {
        var filteredData = alienData.filter(alienData => alienData.country == countryValue);
    }
    else if (dateValue == "" && cityValue == "" && stateValue == "" && countryValue == "" && shapeValue != "") {
        var filteredData = alienData.filter(alienData => alienData.shape == shapeValue);
    }
    else if (dateValue != "" && cityValue != "" && stateValue == "" && countryValue == "" && shapeValue == "") {
        var filteredData = alienData.filter(alienData => alienData.datetime == dateValue && alienData.city == cityValue);
    }

 
    else {
        var filteredData = alienData.filter(alienData => alienData.datetime == dateValue && alienData.city == cityValue && alienData.state == stateValue && alienData.country == countryValue && alienData.shape == shapeValue);
    }
    // Use console.log to check if the above filter worked
    console.log(filteredData);
    // To filter the table, first remove all previous rows
    tbody.html("");
    // Using the table function from above, swap all the data for the filtered data
    filteredData.forEach((alienSighting) => {
        var row=tbody.append("tr");
        Object.entries(alienSighting).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        })
    })
})