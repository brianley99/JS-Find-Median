
// Controller
function handleDataInput() {

    // Get values from DOM
    let dataPoints = document.getElementById('dataPoints-Input').value;

    // Convert input string to an array of numbers
    dataPoints = dataPoints.match(/\d+/g);
    dataPoints = convertToNumbers(dataPoints);

    // Validate input
    if (dataPoints.length > 50) {

        // Display error if more than 50 data points are entered
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter up to 50 data points for accurate calculation.",
        });
        return;
    }

    // Calculate Median
    let dataPointsOrganized = sortAscending(dataPoints);
    let medianValue = findMedian(dataPointsOrganized);

    // Display result
    displayResults(dataPointsOrganized, medianValue);
}

// Logic
function convertToNumbers(dataPoints) {

    // Empty array to store numeric values
    let numericData = [];

    // Add only numeric values to the array
    for (let i = 0; i < dataPoints.length; i++) {

        const element = parseInt(dataPoints[i]);
        if (!Number.isNaN(element)) {

            numericData.push(element);
        }
    }

    // Return the array of numeric values
    return numericData;
}

function sortAscending(dataPoints) {

    // Create a sorted copy of the array in ascending order
    var sortedData = dataPoints.slice().sort(function (a, b) {
        return a - b;
    });

    // Return the sorted array
    return sortedData;
}

function findMedian(dataPoints) {

    const arrayLength = dataPoints.length;
    const midpoint = Math.floor(dataPoints.length / 2);

    if (arrayLength % 2 == 0) {

        // Median is the average of two middle numbers
        let firstMedian = dataPoints[midpoint - 1];
        let secondMedian = dataPoints[midpoint];
        let medianValue = (firstMedian + secondMedian) / 2;

        return medianValue;

    } else {

        // Median is a single middle number
        let medianValue = dataPoints[midpoint];
        return medianValue;
    }
}

// View
function displayResults(dataPoints, median) {

    // Format the result as HTML
    let results = `<span class="text-muted">[${dataPoints}]</span><br/><br/>\
                   <h1 class="text-primary">${median}</h1>`;

    // Display the result in the DOM
    document.getElementById('results').innerHTML = results;
    document.getElementById('resultsContainer').classList.remove('d-none');
}