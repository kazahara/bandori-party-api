**Methods**

get(endpoint_name[, parameters], callback)

&nbsp;&nbsp;&nbsp;&nbsp;*parameters* is the same as you can see on the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

&nbsp;&nbsp;&nbsp;&nbsp;you can also type rarity, attribute and such without "i_" prefix.

**Example code**
~~~~
var bandori_api = require('bandori-party-api');

bandori_api.get('cards', function(error, data){
    if(error) throw error;
    console.log(data);
});

bandori_api.get('members', { page: 2, school: "Hanasakigawa Girls' Academy" }, function(error, data){
    if(error) throw error;
    console.log(data);
});

bandori_api.get('members', { id: 26 }, function(error, data){
    if(error) throw error;
    console.log(data);
});
~~~~
