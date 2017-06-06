# space barnacle
A simple application that uses the ArchivesSpace API to help determine which box a three-dimensional object will fit in.

## Requirements

TODO: add requirements

## Installation

TODO: add installation steps

## How it works
*   A user inputs dimensions of a three dimensional object into separate search fields.
    *    Height is optional, but width and depth are not
    *    These object can only be rotated in two dimensions - width and depth are interchangeable but height is not.
*   A search results page queries the ArchivesSpace API and displays all available container profiles in which that object would fit.
    *    Results should be sorted by the closest match to dimensions
    *    Results should be displayed in a sortable table
    *    For each result, display the name (or the display string) as well as each dimension
    *    If possible, show the number of instances that use a given container profile so you know if a box is commonly available
    *    Page should be printable so a user can take it to find a box

## Contributing

Pull requests accepted!

## Authors

Hillel Arnold  
Julia Welby  
Emeline Swanson  
Erich Chang

## License

Code is released under an MIT License. See `LICENSE.md` for more information.
