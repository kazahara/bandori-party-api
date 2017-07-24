## Methods
---
**get(endpoint_name[, parameters || id])**

> Currently the optional parameters doesn't work. Only the page parameter works on parameters right now

> *parameters* is the same as you can see on the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

> *you can also type rarity, attribute and such without "i_" prefix.*

## Example code
---
~~~~javascript
const bandori = require(`bandori-party-api`);

var log_data = (response) => {
  if (response.statusCode == 404) {
    // Not Found
  } else {
    let data = response.body;
    console.log(data);
  }
};

var log_error = (error) => {
  console.log(error);
};

bandori.get(`cards`)
  .then(log_data)
  .catch(log_error);

let parameters = {
  page: 2
};

bandori.get(`members`, parameters)
  .then(log_data)
  .catch(log_error);

bandori.get(`members`, 26)
  .then(log_data)
  .catch(log_error);

~~~~
