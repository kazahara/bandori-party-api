module.exports = {
  get: get,
  filter: filter
};

const request = require(`request`);

const bandori_api = `http://bandori.party/api`;

function get(endpoint, parameters) {
  let promise = new Promise((resolve, reject) => {
    if (endpoint == ``) {
      throw new Error(
        `bandori.get(endpoint[, parameters]): First argument cannot be an empty String
       `);
    }
    if (typeof endpoint != `string`) {
      throw new TypeError(
        `bandori.get(endpoint[, parameters]): First argument is not a String
        `);
    }
    if (typeof parameters != `object` && typeof parameters != `number` &&
      parameters != undefined) {
      throw new TypeError(
        `bandori.get(endpoint[, parameters]): Second argument needs to be an Object or a Number
        `);
    }

    let options = {
      method: `GET`,
      json: true,
      baseUrl: bandori_api,
      url: (() => {
        if (typeof parameters == `number`) {
          let id = parameters;
          return `${endpoint}/${id}`;
        } else {
          return endpoint;
        }
      })(),
      qs: (() => {
        if (typeof parameters == `object`) {
          check_i_parameters(parameters);
          return parameters;
        } else {
          return undefined;
        }
      })()
    };

    request(options, (error, response, data) => {
      response.body = data;
      resolve(response);
    });
  });
  return promise;
}

function filter(data, parameters) {
  let promise = new Promise((resolve, reject) => {
    if (typeof data != `object`) {
      throw new TypeError(
        `bandori.filter(data, parameters): First argument is not an Object
        `);
    }

    check_i_parameters(parameters);

    for (let parameter in parameters) {
      let filter_value = parameters[parameter];
      if (typeof filter_value == `string`) {
        filter_value = filter_value.toLowerCase();
      }
      let filtered_data = data.results.filter((value, index, array) => {
        let object_value = value[parameter];
        if (typeof object_value == `string`) {
          object_value = object_value.toLowerCase();
        }
        return (object_value == filter_value);
      });
    }

    resolve(filtered_data);
  });
  return promise;
}

function check_i_parameters(parameters) {
  if (typeof parameters != `object`) {
    throw new TypeError(
      `First argument is not an object`);
  }

  let i_parameters = {
    // cards
    rarity: `i_rarity`,
    attribute: `i_attribute`,
    skill_type: `i_skill_type`,
    // members
    band: `i_band`,
    school_year: `i_school_year`,
    astrological_sign: `i_astrological_sign`
  };

  for (let parameter in parameters) {
    let parameter_value = parameters[parameter];
    let i_parameter = i_parameters[parameter];

    if (i_parameter) {
      parameters[i_parameter] = parameter_value;
      delete parameters[parameter];
    }
  }
}
