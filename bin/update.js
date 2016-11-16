const fs = require('fs'); // Node File System
const config = require('../config/proto'); // Config
const ensighten = require('../lib/ensighten')(); // Ensighten API

const args = process.argv.slice(2); // Get CLI arguments

if (args.length !== 1) { // If no arguments throw error and exit
  console.log('Error: You didn\'t specify a file path');
  process.exit(1);
}

const filePath = args[0]; // First argument should be path to filename

ensighten.authenticate(config.auth) // Authenticate
.then(() => ensighten.get(config.spaceID, config.deploymentID)) // Get Deployment Data
.then((data) => {
  const newFile = fs.readFileSync(filePath).toString(); // Read File Path
  const newData = { // Build Updated Ensighten Data Object
    name: data.name,
    code: newFile,
    executionTime: data.executionTime,
    comments: data.comments,
    dependentDeployments: data.dependentDeployments,
    conditionIds: data.conditionIds
  };
  return ensighten.update(config.spaceID, config.deploymentID, newData); // Update Deployment Data
})
.then((status) => {
  console.log(status); // Success!!
})
.catch((err) => {
  console.error('Error', err); // Catch Errors
});
