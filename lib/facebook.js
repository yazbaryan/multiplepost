const axios = require('axios')

const apiUrl = 'https://graph.facebook.com/v2.6/',
      accessToken = process.env.FB_ACCESS_TOKEN

module.exports.upload = function (req) {
  return new Promise(function(resolve, reject) {
    axios.post(apiUrl + 'me/photos', {
      access_token: accessToken,
      caption: 'Hello world',
      url: 'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg'
    })
    .then((res) => {
      let result = {}
      result[res.data.id] = {
        comments: 0,
        likes: 0
      }

      resolve(result)
    })
    .catch((err) => {
      reject(err.message)
    })
  })
}

module.exports.getInfo = function (req) {
  return new Promise(function(resolve, reject) {
    axios.post(apiUrl, {
      access_token: accessToken,
      batch: [
        {
          method: 'GET',
          relative_url: '118372219036728?fields=likes.summary(true),comments.summary(true)'
        }
      ]
    })
    .then((res) => {
      let info = {};

      res.data.forEach(function(el) {
        let body = JSON.parse(el.body)
        info[body.id] = {
          comments: body.comments.summary.total_count,
          likes: body.likes.summary.total_count
        }
      })

      resolve(info)
    })
    .catch((err) => {
      reject(err.message)
    })
  })
}
