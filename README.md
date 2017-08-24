## Requirements
+ node 8.x

## Methods

### get(endpoint[, parameters || id])

> Currently the optional parameters doesn't work. <br />Only the page parameter works on parameters right now

**Note**: *parameters* is the same as the [documentation](https://github.com/SchoolIdolTomodachi/BanGDream/wiki/BanG-Dream!-Girls-Band-API).

## Example code
~~~~javascript
const bandori = require(`bandori-party-api`)

async function getCards(){
  try{
    const cards = await bandori.get('cards')
    console.log(cards)
  } catch (error){
    console.log(error)
  }
}

getCards()
// the async function above is equal to:
// bandori.get('cards')
//   .then(cards => console.log(cards))
//   .catch(error => console.log(error))

~~~~
