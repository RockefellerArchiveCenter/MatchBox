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

displayData();

$(document).ready(function() {
    $('#results').DataTable();
} );
