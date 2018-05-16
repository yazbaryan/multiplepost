const rest = require('restler')
      fs = require('fs')

const apiUrl = 'https://graph.facebook.com/v3.0/',
      // accessToken = process.env.FB_ACCESS_TOKEN
      accessToken = 'EAACEdEose0cBAIPZAH8lAoQQkoskCNBFk21B22E2gLr0EMgweTYulpyZAdsafF7ut1YsYbwZC28ZBNFMI0MrlNV1Oh74Kwo1B2hTq4Ahi8yKAtEZBSp47YtjMLOyRxav3abQoBK1bBKVgaotQVUHAHWcGGQvToc3LPR7Vhz9olODoENLWmJ4vw6GCwUnEenMK8IcCsxe8NK0QR2WDmCqI'

module.exports.upload = function (req) {
  return new Promise(function(resolve, reject) {
    rest.post(apiUrl + 'me/photos', {
      multipart: true,
      data: {
        access_token: accessToken,
        caption: req.caption,
        source: rest.file(req.image)
      }
    }).on('success', function(data, response) {
        console.log(data)
    }).on('fail', function(data, response) {
        console.log(data.error.message)
    })

    // axios.post(apiUrl + 'me/photos', {
    //   access_token: accessToken,
    //   caption: req.caption,
    //   images: [{
    //     source: req.image
    //   }]
    // })
    // .then((res) => {
    //   let result = {}
    //   result[res.data.id] = {
    //     comments: 0,
    //     likes: 0
    //   }
    //
    //   resolve(result)
    // })
    // .catch((err) => {
    //   console.log(err);
    //   reject(err.message)
    // })
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
