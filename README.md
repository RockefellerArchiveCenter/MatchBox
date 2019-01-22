# MatchBox
A simple application that uses the ArchivesSpace API to help determine the box into which a three-dimensional object will fit. A demonstration site is available at [https://github.com/RockefellerArchiveCenter/MatchBox](https://github.com/RockefellerArchiveCenter/MatchBox)

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

## How it works

The application queries the ArchivesSpace API to get all container profiles, and displays them in a handy table format that can be sorted and searched.

## Contributing

Pull requests accepted!

## Authors

Hillel Arnold  
Julia Welby  
Emeline Swanson  
Erich Chang

## License

Code is released under an MIT License. See `LICENSE.md` for more information.
