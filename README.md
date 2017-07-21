**Methods**

get(endpoint_name[, parameters || id], callback)

&nbsp;&nbsp;&nbsp;&nbsp;**Currently the optional parameters doesn't work. Only the page works on parameters right now**

&nbsp;&nbsp;&nbsp;&nbsp;*parameters* is the same as you can see on the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

&nbsp;&nbsp;&nbsp;&nbsp;*you can also type rarity, attribute and such without "i_" prefix.*

**Example code**
~~~~
var bandori = require('bandori-party-api');

var log_data = (response) => {
	if (response.statusCode == 404) {
		// Not Found
	} else {
		var data = response.body;
		console.log(data);
	}
};

var log_error = (error) => {
	console.log(error);
};

bandori.get('cards')
	.then(log_data)
	.catch(log_error);

bandori.get('members', { page: 2 })
	.then(log_data)
	.catch(log_error);

bandori.get('members', 26)
	.then(log_data)
	.catch(log_error);
~~~~
