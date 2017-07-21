module.exports = {
	get: get,
	filter: filter
};

var request = require('request');

var bandori_api = 'http://bandori.party/api';

function get(endpoint, parameters) {
	var promise = new Promise((resolve, reject) => {
		if (endpoint == '') {
			throw new Error('first argument of get() cannot be an empty String');
		}
		if (typeof endpoint != 'string') {
			throw new TypeError('first argument of get() is not a String');
		}
		if (typeof parameters != 'object' && typeof parameters != 'number' &&
			parameters != undefined) {
			throw new TypeError('second argument of get() needs to be an Object or Number');
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
			response.body = data;
			resolve(response);
		});
	});
	return promise;
}

function filter(data, parameters) {
	var promise = new Promise((resolve, reject) => {
		if (typeof data != 'object') {
			throw new TypeError('first argument is not an object');
		}

		check_i_parameters(parameters);

		for (var parameter in parameters) {
			var filter_value = parameters[parameter];
			if (typeof filter_value == 'number') {
				filter_value = filter_value.toString();
			}
			filter_value = filter_value.toLowerCase();
			var filtered_data = data.results.filter((value, index, array) => {
				var object_value = value[parameter];
				if (typeof object_value == 'number') {
					object_value = object_value.toString();
				}
				object_value = object_value.toLowerCase();
				return (object_value == filter_value);
			});
		}
		resolve(filtered_data);
	});
	return promise;
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
		throw new TypeError('first argument is not an object');
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
