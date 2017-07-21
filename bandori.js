module.exports = {
	get: get,
	filter: filter
};

var request = require('request');

var bandori_api = 'http://bandori.party/api';

function get(endpoint, parameters, callback) {
	if (arguments.length == 2) {
		callback = arguments[1];
		parameters = undefined;
	}

	if (endpoint == '') {
		throw new Error('endpoint cannot be an empty String');
	}
	if (typeof endpoint != 'string') {
		throw new TypeError('endpoint is not a String');
	}
	if (typeof parameters != 'object' && typeof parameters != 'number' &&
		parameters != undefined) {
		throw new TypeError('parameters needs to be an Object or Number');
	}
	if (typeof callback != 'function') {
		throw new TypeError('callback is not a Function');
	}

	if (typeof parameters == 'number') {
		var id = parameters;
		endpoint += `/${id}`;
	}
	var options = {
		baseUrl: bandori_api,
		url: endpoint,
		method: `GET`,
		json: true
	};
	if (typeof parameters == 'object') {
		check_i_parameters(parameters);
		options.qs = parameters;
	}

	request(options, (error, response, data) => {
		if (response.statusCode == 404) {
			error = `The requested URL "${endpoint}" was not found.`;
			data = undefined;
		}

		callback(error, data);
	});
}

function filter(data, parameters) {
	if (typeof data != 'object') {
		throw new TypeError('data is not an object');
	}

	check_i_parameters(parameters);

	for (var parameter in parameters) {
		var filter_value = parameters[parameter].toLowerCase();
		data.results = data.results.filter((value, index, array) => {
			var object_value = value[parameter].toLowerCase();
			return (object_value == filter_value);
		});
	}
}

var i_parameters = {
	// cards
	rarity: 'i_rarity',
	attribute: 'i_attribute',
	skill_type: 'i_skill_type',
	// members
	band: 'i_band',
	school_year: 'i_school_year',
	astrological_sign: 'i_astrological_sign'
};

function check_i_parameters(parameters) {
	if (typeof parameters != 'object') {
		throw new TypeError('parameters is not an object');
	}

	for (var parameter in parameters) {
		var parameter_value = parameters[parameter];
		var i_parameter = i_parameters[parameter];

		if (i_parameter) {
			parameters[i_parameter] = parameter_value;
			delete parameters[parameter];
		}
	}
}
