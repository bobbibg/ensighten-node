const request = require('request');

/**
 * @module EnsightenAPI
 * @description Library for making requests to the ensighten API
 * @author Rob Barns-Graham <rob.barns-graham@hearst.co.uk>
 */
const EnsightenAPI = () => {
  let token = false;

  return {
    /**
     * @method authenticate
     * @description Authenticate request
     * @param auth {String} Base64 encoded authentication details 'mycompany:joe:mypassword'
     * @returns {Promise} Resolves with access token, rejects with error message
     */
    authenticate: auth => new Promise((resolve, reject) => {
      const opts = {
        url: 'https://manage-api.ensighten.com/auth/token',
        body: 'grant_type=password',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${auth}`
        }
      };
      request.post(opts, (error, response, body) => {
        if (error) reject(error);
        const jsonBody = JSON.parse(body);
        token = jsonBody.access_token;
        resolve(token);
      });
    }),

    /**
     * @method get
     * @description Get a deployment
     * @param space {Number} Space ID
     * @param deployment {Number} Deployment ID
     * @returns {Promise} Resolves with JSON object of deployment data, rejects with error message.
     */
    get: (space, deployment) => new Promise((resolve, reject) => {
      const opts = {
        url: `https://manage-api.ensighten.com/manage/spaces/${space}/deployments/${deployment}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      };
      request.get(opts, (error, response, body) => {
        if (error) reject(error);
        resolve(JSON.parse(body));
      });
    }),

    /**
     * @method update
     * @description Update a deployment
     * @param space {Number} Space ID
     * @param deployment {Number} Deployment ID
     * @param data {Object} Updated Ensighten deployment object
     * @returns {Promise} Resolves with status code, rejects with error message.
     */
    update: (space, deployment, data) => new Promise((resolve, reject) => {
      const opts = {
        url: `https://manage-api.ensighten.com/manage/spaces/${space}/deployments/${deployment}`,
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
      request.put(opts, (error, response, body) => {
        if (error) reject(error);
        if (response.statusCode !== 204) reject(JSON.parse(body));
        else resolve(response.statusCode);
      });
    })
  };
};

module.exports = EnsightenAPI;
