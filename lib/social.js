const CronJob = require('cron').CronJob
      facebook = require('./facebook')
      fs = require('fs')
      file = './data/social.json'

let job = new CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    updateData()
  },
  start: true
})

let data = {}

fs.readFile(file, 'utf8', function (err, contents) {
  if (err) {
    contents = JSON.stringify({
      'facebook': {}
    })

    fs.writeFile(file, contents, function (err) {
      if (err) throw err;
    })
  }

  data = JSON.parse(contents)
})

module.exports.upload = async function (req) {
  let response = {
    facebook: await facebook.upload()
  }

  mergeData(response)

  return response
}

module.exports.getData = async function (req) {
  return data
}

function mergeData(response) {
  for (var key in response) {
    data[key] = {...data[key], ...response[key]}
  }

  fs.writeFile(file, JSON.stringify(data), function (err) {
    if (err) throw err;
  })
}

async function updateData() {
  let response = {
    facebook: await facebook.getInfo()
  }

  mergeData(response)
}

updateData()
