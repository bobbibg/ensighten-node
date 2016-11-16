const config = require('../config/proto'); // Config
const ensighten = require('../lib/ensighten')(); // Ensighten API

ensighten.authenticate(config.auth) // Authenticate
.then(() => ensighten.get(config.spaceID, config.deploymentID)) // Get Deployment Data
.then(data => console.log(data)) // Log Data
.catch((err) => {
  console.error('Error', err); // Catch Errors
});
