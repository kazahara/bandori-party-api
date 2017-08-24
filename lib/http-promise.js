const http = require('http')

function getJSON (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      const { statusCode } = response
      const contentType = response.headers['content-type']

      let error
      if (statusCode !== 200) {
        error = new Error(`Request Failed. Status Code: ${statusCode}`)
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`)
      }
      if (error) {
        response.resume() // consume response data to free up memory
        reject(error.message)
      }

      response.setEncoding('utf8')
      let raw_data = ''
      response.on('data', (chunk) => raw_data += chunk)
      response.on('end', () => {
        try {
          const data = JSON.parse(raw_data)
          resolve(data)
        } catch (error) {
          reject(error.message)
        }
      })
    }).on('error', (error) => {
      reject(error.message)
    })
  })
}

module.exports = { getJSON }
