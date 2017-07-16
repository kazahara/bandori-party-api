**Methods**

get(endpoint_name[, parameters], callback)

&nbsp;&nbsp;&nbsp;&nbsp;*parameters* is the same as you can see on the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API)

**Example code**
~~~~
var bandori_api = require('bandori-party-api');

bandori_api.get('cards', function(error, data){
    if(error) throw error;
    console.log(data);
});

bandori_api.get('members', { school: "Hanasakigawa Girls' Academy" }, function(error, data){ // id and page is included in the parameters
    if(error) throw error;
    console.log(data);
});
~~~~
