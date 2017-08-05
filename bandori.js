const http = require(`http`);
const { URL, URLSearchParams } = require(`url`);

class Bandori {
  get(endpoint, parameters) {
    return new Promise((resolve, reject) => {
      if (endpoint == ``) {
        reject(`bandori.get(endpoint[, parameters]): endpoint cannot be an empty String`);
      }
      if (typeof endpoint != `string`) {
        reject(`bandori.get(endpoint[, parameters]): endpoint is not a String`);
      }
      if (typeof parameters != `object` && typeof parameters != `number` &&
        parameters != undefined) {
        reject(`bandori.get(endpoint[, parameters]): parameters needs to be an Object or a Number`);
      }

      let url = new URL(`http://bandori.party`);
      url.pathname = `/api/${endpoint}/`;
      if (typeof parameters == `number`) {
        const id = parameters;
        url.pathname += `${id}/`;
      } else if (typeof parameters == `object`) {
        const queries = new URLSearchParams(parameters);
        url.search = queries;
      }

      http.get(url, (response) => {
        const { statusCode } = response;
        const contentType = response.headers[`content-type`];

        let error;
        if (statusCode !== 200) {
          error = new Error(`Request Failed. Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
        }
        if (error) {
          response.resume(); // consume response data to free up memory
          reject(error.message);
        }

        response.setEncoding('utf8');
        let raw_data = ``;
        response.on(`data`, (chunk) => raw_data += chunk);
        response.on(`end`, () => {
          try {
            const data = JSON.parse(raw_data);
            resolve(data);
          } catch (error) {
            reject(error.message);
          }
        });
      }).on(`error`, (error) => {
        reject(error.message);
      });
    });
  }
}

module.exports = new Bandori;
