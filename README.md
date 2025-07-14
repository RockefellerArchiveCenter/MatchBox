# MatchBox
A simple application that uses the ArchivesSpace API to help determine the box into which a three-dimensional object will fit.

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

2.  With [Docker](https://docs.docker.com/get-started/get-docker/) installed, build the container: 
        
        docker build -t matchbox .

3.  Run the container, passing configuration values as environment variables:

        docker run -p 80:80 \
          -e BASEURL:http://localhost:8089 \
          -e API_TOKEN:81ee42992541795ad7cee5b5701a632fd43a61831b1768cab88e921e3a983e27 \
          -e PREFERRED_CONTAINERS:"['/container_profiles/1","/container_profiles/2']" \
          matchbox

The `API_TOKEN` should be a non-expiring session token from ArchivesSpace. To get this token, use a `expiring=false` 
parameter when making an [ArchivesSpace authentication request](http://archivesspace.github.io/archivesspace/api/#authentication).

## Contributing

This is an open source project and we welcome contributions! If you want to fix a bug, or have an idea of how to enhance the application, the process looks like this:

1. File an issue in this repository. This will provide a location to discuss proposed implementations of fixes or enhancements, and can then be tied to a subsequent pull request.
2. If you have an idea of how to fix the bug (or make the improvements), fork the repository and work in your own branch. When you are done, push the branch back to this repository and set up a pull request. Automated unit tests are run on all pull requests. Any new code should have unit test coverage, documentation (if necessary), and should conform to the Python PEP8 style guidelines.
3. After some back and forth between you and core committers (or individuals who have privileges to commit to the base branch of this repository), your code will probably be merged, perhaps with some minor changes.

## Authors

Hillel Arnold  
Julia Welby  
Emeline Swanson  
Erich Chang

## License

Code is released under an MIT License. See `LICENSE.md` for more information.
