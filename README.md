## Requirements
+ node 8.x

## Methods

### get(endpoint[, parameters || id])

> Currently the optional parameters doesn't work. <br />Only the page parameter works on parameters right now

**Note**: *parameters* is the same as the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

## Example code
~~~~javascript
const bandori = require(`bandori-party-api`);

var log_data = (data) => {
  console.log(data);
};

var log_error = (error) => {
  console.log(error);
};

bandori.get(`cards`)
  .then(log_data)
  .catch(log_error);

bandori.get(`members`, { page: 2 })
  .then(log_data)
  .catch(log_error);

bandori.get(`members`, 26)
  .then(log_data)
  .catch(log_error);

~~~~
