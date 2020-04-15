# MatchBox
A simple application that uses the ArchivesSpace API to help determine the box into which a three-dimensional object will fit.

A demonstration site, which uses static data, is available at [http://demo.matchbox.rockarch.org/](http://demo.matchbox.rockarch.org/)

## What is MatchBox?

MatchBox is a browser-based tool that matches archival objects to appropriate box sizes. This collections management tool is used for housing materials that require box sizes more specialized than standard record storage boxes or standard letter/legal document boxes.

Materials that often require specialized box sizes include realia and large or bulky documents such as flat files or scrapbooks. These archival objects are often considered to be oversize and/or three dimensional. MatchBox allows the individual working with such items to find boxes that will work best for long-term storage and preservation.  

Additionally, MatchBox is used for calculating cubic footage of container profile(s). These calculations are necessary for space management and determining the extent of collections for inclusion in accession and resource records.

## How it Works
MatchBox displays a list of all container profiles recorded in ArchivesSpace along with their dimensions. MatchBox displays this data through the ArchivesSpace API, ensuring that the container profile information displayed is up to date.

The dimensions of an object are entered into their respective fields: depth (length), width, and height. The results will populate, eliminating container profile options that are too small. If the results exclude adequate container options, there is typically no appropriate container profile recorded in ArchivesSpace.

Cubic footage can be calculated by entering the quantity for each container profile. The total number will populate at the bottom of the page. The cubic footage for individual container profiles is also listed in the rightmost column.

## Requirements

Because the application makes HTTP using Javascript, CORS needs to be implemented on your ArchivesSpace instance. See [as-cors](https://github.com/RockefellerArchiveCenter/as-cors) for an example of how to do this with an ArchivesSpace plugin.

The following routes need to have CORS requesting enabled:

        /container_profiles  
        /container_profiles/:id

## Installation

1.  Download or clone this repository.

2.  Set up a config file, which should be named `app-config.js` and placed in the `js/` directory. It should look something like this:

        var baseUrl = "http://localhost:8089"; // Base url for your ArchivesSpace instance, including the backend port number
        var token = "81ee42992541795ad7cee5b5701a632fd43a61831b1768cab88e921e3a983e27"; // Non-expiring session token for an AS user
        preferredContainers = ["/container_profiles/1","/container_profiles/2"] // optional list of AS URIs for container profiles to be marked as preferred

To get a non-expiring session token, use a `expiring=false` parameter when making an [ArchivesSpace authentication request](http://archivesspace.github.io/archivesspace/api/#authentication).

## Contributing

Pull requests accepted!

## Authors

Hillel Arnold  
Julia Welby  
Emeline Swanson  
Erich Chang

## License

Code is released under an MIT License. See `LICENSE.md` for more information.
