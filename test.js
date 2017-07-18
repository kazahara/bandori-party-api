var bandori = require('./bandori.js');

bandori.get('members', (error, data) => {
	if (error) throw error;
	console.log(data);
});
