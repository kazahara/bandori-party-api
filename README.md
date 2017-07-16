Example code

~~~~
var bandori_api = require('bandori-party-api');

bandori_api.get('members', { page:2 }, function(error, data){
    if(error) throw error;
    console.log(data);
});
~~~~
