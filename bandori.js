module.exports = {
	get: get
};

var request = require('request');

var api_link = 'http://bandori.party/api';

function get(endpoint, parameters, callback) {
	if (arguments.length == 2) {
		callback = arguments[1];
		parameters = {};
	}
	if (!parameters.id) {
		parameters.id = '';
	}

	var partial_link = `${api_link}/${endpoint}/${parameters.id}?`
	var endpoint_link = check_for_parameters(partial_link, parameters);
	request(endpoint_link, (error, response, body) => {
		var data;
		if (response.statusCode == 404) {
			error = `Not Found\nThe requested URL "${endpoint_link}" was not found.`;
		} else {
			data = JSON.parse(body);
		}

		callback(error, data);
	});
}

function check_for_parameters(link, parameters) {
	for (var key in parameters) {
		if (key == 'id') {
			continue;
		}
		link += `${key}=${parameters[key]}`
	}
	return link;
}
