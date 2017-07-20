**Methods**

get(endpoint_name[, parameters || id], callback)

&nbsp;&nbsp;&nbsp;&nbsp;**Currently the optional parameters doesn't work. Only the page works on parameters right now**

&nbsp;&nbsp;&nbsp;&nbsp;*parameters* is the same as you can see on the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

&nbsp;&nbsp;&nbsp;&nbsp;*you can also type rarity, attribute and such without "i_" prefix.*

**Example code**
~~~~
var bandori = require('bandori-party-api');

bandori.get('cards', function(error, data){
    if(error) throw error;
    console.log(data);
});

bandori.get('members', { page: 2 }, function(error, data){
    if(error) throw error;
    console.log(data);
});

bandori.get('members', 26, function(error, data){
    if(error) throw error;
    console.log(data);
});
~~~~
