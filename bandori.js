const { getJSON } = require('./lib/http-promise.js')
const { URL, URLSearchParams } = require('url')

class Bandori {
  async get (endpoint, parameters) {
    if (endpoint === '') {
      throw 'bandori.get(endpoint[, parameters]): endpoint cannot be an empty String'
    }
    if (typeof endpoint !== 'string') {
      'bandori.get(endpoint[, parameters]): endpoint is not a String'
    }
    if (typeof parameters !== 'object'
     && typeof parameters !== 'number'
     && parameters !== undefined) {
      throw 'bandori.get(endpoint[, parameters]): parameters needs to be an Object or a Number'
    }

    let url = new URL(`http://bandori.party/`)
    url.pathname = `api/${endpoint}/`
    switch (typeof parameters) {
      case 'number':
        const id = parameters
        url.pathname += `${id}/`
        break
      case 'object':
        const queries = new URLSearchParams(parameters)
        url.search = queries
    }

    const data = await getJSON(url)
    return data
  }
}

module.exports = new Bandori()
