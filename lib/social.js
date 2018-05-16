const sqlite3 = require('sqlite3').verbose(),
      db = new sqlite3.Database('./data/database.sqlite')

db.run('CREATE TABLE IF NOT EXISTS posts (id, network, created_at)')
db.run('CREATE TABLE IF NOT EXISTS post_infos (id, post_id, likes, comments, date)')

const CronJob = require('cron').CronJob
      facebook = require('./facebook')
      fs = require('fs')
      file = './data/social.json'

// let job = new CronJob({
//   cronTime: '* * * * *',
//   onTick: function() {
//     updateData()
//   },
//   start: true
// })

let data = {}

// fs.readFile(file, 'utf8', function (err, contents) {
//   if (err) {
//     contents = JSON.stringify({
//       'facebook': {}
//     })
//
//     fs.writeFile(file, contents, function (err) {
//       if (err) throw err;
//     })
//   }
//
//   data = JSON.parse(contents)
// })

module.exports.upload = async function (req) {
  let request = {
    caption: req.body.caption,
    image: req.files.image
  }

  let response = {
    facebook: await facebook.upload(request)
  }

  // mergeData(response)

  return response
}

module.exports.getData = async function (req) {
  return data
}

// function mergeData(response) {
//   for (var key in response) {
//     data[key] = {...data[key], ...response[key]}
//   }
//
//   fs.writeFile(file, JSON.stringify(data), function (err) {
//     if (err) throw err;
//   })
// }
//
// async function updateData() {
//   let response = {
//     facebook: await facebook.getInfo().catch(err => {
//
//     })
//   }
//
//   mergeData(response)
// }

// updateData()
