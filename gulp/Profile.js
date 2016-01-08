
var Profile = {
    backend: null,
    frontend: null,
    basePath: null,
    environment: null//one of [dev, prod]
};


//local profile
Profile.backend = 'phpmanager/json.php/';
Profile.frontend = '';
Profile.basePath = '';
Profile.env = 'dev';


/*
//local demo
Profile.backend = 'http://10.10.9.144/phpmanager/json.php/';
Profile.frontend = 'http://10.10.9.144/';
Profile.basePath = 'new_ui';
Profile.env = 'prod';
*/

/*
//scnsoft demo server 
Profile.backend = 'http://10.10.9.131/phpmanager/json.php/';
Profile.frontend = 'http://10.10.9.131/';
Profile.basePath = '';
Profile.env = 'prod';
*/

module.exports = Profile;