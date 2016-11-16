const assert = require('chai').assert;
const sinon = require('sinon');
const request = require('request');

const api = require('../lib/ensighten.js')();

const dummyAuth = require('./data/auth');
const dummyGet = require('./data/get');
const dummyUpdate = require('./data/update');

const testAuthKey = '12345';

describe('api.authenticate()', () => {
  before(() => {
    /** Dummy the API response to use the data in ./data/auth **/
    sinon.stub(request, 'post').yields(null, null, JSON.stringify(dummyAuth));
  });

  it('should return a valid authentication token from a authentication request', (done) => {
    api.authenticate(testAuthKey)
    .then((token) => {
      /** Check that the promise resolves with this.token set to be the access token from the response **/
      assert.strictEqual(token, dummyAuth.access_token);
      done();
    })
    .catch((error) => {
      console.log(error);
    });
  });
});

describe('api.get()', () => {
  before(() => {
    /** Dummy the API response to use the data in ./data/get **/
    sinon.stub(request, 'get').yields(null, null, JSON.stringify(dummyGet));
  });

  it('should return an ensighten data object from a get request', (done) => {
    api.get(dummyGet.spaceId, dummyGet.id)
    .then((data) => {
      /** Check that the promise resolves with the dummy response data **/
      assert.deepEqual(data, dummyGet);
      done();
    })
    .catch((error) => {
      console.log(error);
    });
  });
});

describe('api.update()', () => {
  before(() => {
    /** Dummy the API response to return a status code of 204 **/
    sinon.stub(request, 'put').yields(null, { statusCode: 204 });
  });

  it('should return a status code of 204 from an update request', (done) => {
    api.update(dummyGet.spaceId, dummyGet.id, dummyUpdate)
    .then((response) => {
      /** Check that the promise resolves with the status code **/
      assert.strictEqual(response, 204);
      done();
    })
    .catch((error) => {
      console.log(error);
    });
  });
});
