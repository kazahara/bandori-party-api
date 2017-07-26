const request = require(`request`);

const bandori_api = `http://bandori.party/api`;

class Bandori {
  get(endpoint, parameters) {
    let promise = new Promise((resolve, reject) => {
      if (endpoint == ``) {
        throw new Error(
          `bandori.get(endpoint[, parameters]): endpoint cannot be an empty String`);
      }
      if (typeof endpoint != `string`) {
        throw new TypeError(
          `bandori.get(endpoint[, parameters]): endpoint is not a String`);
      }
      if (typeof parameters != `object` && typeof parameters != `number` &&
        parameters != undefined) {
        throw new TypeError(
          `bandori.get(endpoint[, parameters]): parameters needs to be an Object or a Number`);
      }

      let options = {
        method: `GET`,
        json: true,
        baseUrl: bandori_api,
        url: (typeof parameters == `number`) ? `${endpoint}/${parameters}` : endpoint,
        qs: (typeof parameters == `object`) ? parameters : undefined,
      };

      request(options, (error, response, data) => {
        response.body = data;
        resolve(response);
      });
    });
    return promise;
  }
}

module.exports = new Bandori;
