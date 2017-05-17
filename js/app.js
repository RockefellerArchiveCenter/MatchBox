let dataSet; // declares a global variable for our dataset

// Gets data from ArchivesSpace
function getContainersIds(uri, table) {
    ids = $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("X-ArchivesSpace-Session", token);
        },
        url: baseUrl + uri,
        success: function(data) {
            for (item of data) {
                getContainerData('/container_profiles/' + item)
            }
        }
    });
}

function getContainerData(uri) {
    containers = $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("X-ArchivesSpace-Session", token);
        },
        url: baseUrl + uri,
        success: function(data) {
            makeRow(data)
        }
    });
}

// Concatenates data into HTML table row
function makeRow(container) {
    let row = '<tr><td>' + container['name'] + '</td><td>' + container['height'] + '</td><td>' + container['width'] + '</td><td>' + container['depth'] + '</td>'
    $('#results tbody').append(row);
}

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        let minHeight = parseInt($('#height').val(), 10);
        let minWidth = parseInt($('#width').val(), 10);
        let minDepth = parseInt($('#depth').val(), 10);
        let height = parseFloat(data[1]) || 0; // use data for the height column
        let width = parseFloat(data[2]) || 0; // use data for the height column
        let depth = parseFloat(data[3]) || 0; // use data for the height column

        if ((isNaN(minHeight) && isNaN(minWidth) && isNaN(minDepth)) || // if all fields are empty
            (isNaN(minHeight) && isNaN(minWidth) && depth >= minDepth) || // if only one field has a value
            (isNaN(minHeight) && width >= minWidth && isNaN(minDepth)) ||
            (height >= minHeight && isNaN(minWidth) && isNaN(minDepth)) ||
            (isNaN(minHeight) && width >= minWidth && depth >= minDepth) || // if two fields have a value
            (height >= minHeight && isNaN(minWidth) && depth >= minDepth) ||
            (height >= minHeight && width >= minWidth && isNaN(minDepth)) ||
            (height >= minHeight && width >= minWidth && depth >= minDepth) // if all fields have a value
        ) {
            return true;
        }
        return false;
    }
);

// this function executes when the DOM has loaded
$(document).ready(function() {
    // load the data
    getContainersIds('/container_profiles?all_ids=true')
});

// this function executes when all the AJAX request have completed
$(document).ajaxStop(function() {
    // declare our table with options
    let table = $('#results').DataTable({
        "data": dataSet,
        "order": [
            [0, 'asc']
        ], // sets default sorts as title column, ascending
        "paging": false, // removes paging
        "sDom": "lrtip" // disables the search box
    });

    // show in the completed table
    $("#results").fadeIn();

  // Event listener to redraw on search input
  $('#height, #width, #depth').keyup( function() {
      table.draw();
  } );

    $('#results').DataTable();

} );
