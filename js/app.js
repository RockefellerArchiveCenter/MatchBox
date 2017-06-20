// Placeholder function: reads data from a local file, will eventually get data from AS
function getData() {
  return data
  console.log('data')
}

// Concatenates data into HTML table row
function makeRow(container) {
  row = '<tr><td>'+container['name']+'</td><td>'+container['height']+'</td><td>'+container['width']+'</td><td>'+container['depth']+'</td>'
  $('#results tbody').append(row);
}

// Main function that loops through data and displays it as table rows
function displayData() {
  let data = getData();
  for(var item of data) {
    makeRow(item)
  }
}

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var minHeight = parseInt( $('#height').val(), 10 );
        var minWidth = parseInt( $('#width').val(), 10 );
        var minDepth = parseInt( $('#depth').val(), 10 );
        var height = parseFloat( data[1] ) || 0; // use data for the height column
        var width = parseFloat( data[2] ) || 0; // use data for the height column
        var depth = parseFloat( data[3] ) || 0; // use data for the height column

        if ( ( isNaN( minHeight ) && isNaN( minWidth ) && isNaN( minDepth )) || // if all fields are empty
             ( isNaN( minHeight ) && isNaN( minWidth ) && depth >= minDepth ) || // if only one field has a value
             ( isNaN( minHeight ) && width >= minWidth && isNaN( minDepth )) ||
             ( height >= minHeight && isNaN( minWidth ) && isNaN( minDepth )) ||
             ( isNaN( minHeight ) && width >= minWidth && depth >= minDepth ) || // if two fields have a value
             ( height >= minHeight && isNaN( minWidth ) && depth >= minDepth ) ||
             ( height >= minHeight && width >= minWidth && isNaN( minDepth )) ||
             ( height >= minHeight && width >= minWidth && depth >= minDepth ) // if all fields have a value
           )
        {
            return true;
        }
        return false;
    }
);

displayData();

$(document).ready(function() {
    var table = $('#results').DataTable({
      "order": [[ 0, 'asc' ]], // sets default sorts as title column, ascending
      "paging": false, // removes paging
      "sDom": "lrtip" // disables the search box
    });

  // Event listener to redraw on search input
  $('#height, #width, #depth').keyup( function() {
      table.draw();
  } );

    $('#results').DataTable();

} );
