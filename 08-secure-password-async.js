var db = require('./db')
var pwd = require('secure-password')({
  memlimit: 1024 * 1024 * 128,
  opslimit: 8
})

function register (username, password, cb) {
  var ping = setInterval(function () {
    console.log('        hash')
  }, 100)
  pwd.hash(password, function (err, hash) {
    clearInterval(ping)
    if (err) return cb(err)
    db.set(username, hash)
    return cb()
  })
}

function login (username, password, cb) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  var ping = setInterval(function () {
    console.log('        verify')
  }, 100)
  return pwd.verify(password, savedHash, function (err, valid) {
    clearInterval(ping)
    if (err) return cb(err)

    return cb(null, valid)
  })
}

register('emilbayes', Buffer.from('secret'), function (err) {
  if (err) return console.error(err)

  login('emilbayes', Buffer.from('secret'), function (err, valid) {
    if (err) return console.error(err)

    console.log(valid)
    login('emilbayes', Buffer.from('secret2'), function (err, valid) {
      if (err) return console.error(err)

      console.log(valid)
    })
  })
})
