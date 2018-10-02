// Gets data from ArchivesSpace
function getData(uri, list) {
    $.ajax({
        type: "GET",
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("X-ArchivesSpace-Session", token);
        },
        url: baseUrl + uri,
        success: function(data) {
            if (list) { // if the data that's returned is a list, iterate through it and get each item's data
                for (item of data) {
                    getData('/container_profiles/' + item, false);
                }
            } else { // otherwise, use the data returned to make a row
                makeRow(data);
            }
        },
        error: function (request, status, error)
        {
          $('<div class="alert alert-danger" role="alert"><h1>Oops, there was an error!</h1><h4>Make sure ArchivesSpace is running and your credentials are correct</h4></div>').insertAfter("#results");
        }
    });
}

// Concatenates data into HTML table row
function makeRow(container) {
    var cubicFeet = ((container['height']*container['width']*container['depth'])/1728).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    if (preferredContainers.indexOf(container["uri"])>=0) {
      let row = '<tr class="preferred"><td><input class="count form-control" type="number" min="0"></td><td>' + container['name'] + '</td><td>' + container['height'] + '</td><td>' + container['width'] + '</td><td>' + container['depth'] + '</td><td>'+cubicFeet+'</td>'
      $('#results tbody').append(row);
    } else {
      let row = '<tr><td><input class="count form-control" type="number" min="0"></td><td>' + container['name'] + '</td><td>' + container['height'] + '</td><td>' + container['width'] + '</td><td>' + container['depth'] + '</td><td>'+cubicFeet+'</td>'
      $('#results tbody').append(row);
    }
}

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        let minHeight = parseInt($('#height').val(), 10);
        let minWidth = parseInt($('#width').val(), 10);
        let minDepth = parseInt($('#depth').val(), 10);
        let height = parseFloat(data[1]) || 0; // use data for the height column
        let width = parseFloat(data[2]) || 0; // use data for the width column
        let depth = parseFloat(data[3]) || 0; // use data for the depth column

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

function calculate(input) {
  if (input.getAttribute('value') === input.value) {
      $(input).data('lastvalue', input.value);
  } else {
      totalCubicFeet = parseFloat($('#total-cubic-feet').text());
      cubicFeet = parseFloat($(input).parents('tr').children('td').last().text());
      if (input.value < $(input).data('lastvalue')) { // subtraction
        difference = $(input).data('lastvalue') - (input.value || 0);
        newTotalCubicFeet = totalCubicFeet-(cubicFeet*difference);
      } else { // addition
        difference = input.value - ($(input).data('lastvalue') || 0)
        newTotalCubicFeet = totalCubicFeet+(cubicFeet*difference);
      }
      $('#total-cubic-feet').text(newTotalCubicFeet.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
      $(input).data('lastvalue', input.value);
  }
  if (newTotalCubicFeet > 0) {
    $('.calculator').removeClass('closed');
  } else {
    $('.calculator').addClass('closed');
  }
}

// this function executes when the DOM has loaded
$(document).ready(function() {
    // load the data
    getData('/container_profiles?all_ids=true', true);
});

// this function executes when all the AJAX requests have completed
$(document).ajaxStop(function() {
    // declare our table with options
    let table = $('#results').DataTable({
        "order": [
            [1, 'asc']
        ], // sets default sorts as title column, ascending
        "paging": false, // removes paging
        "sDom": "lrti" // disables the search box
    });

    // hide the loading gif
    $("#loading").hide();

    // show the completed table
    $("#results").fadeIn();

  // Event listener to redraw on search input
  $('#height, #width, #depth').keyup( function() {
      table.draw();
  } );

  $('#results').DataTable();

  // Cubic footage calculator functions
  $('.count').on('input change', function(){
    calculate(this)
  });

  $('#clear-count').on('click', function(){
    $('.count').val("");
    $('#total-cubic-feet').text(0);
    $('.calculator').addClass('closed');
  });

});
