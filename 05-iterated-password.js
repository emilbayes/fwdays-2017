var db = require('./db')
var crypto = require('crypto')

var iter = 1e6
var hashLen = 512
var algo = 'sha512'
function register (username, password, cb) {
  var salt = crypto.randomBytes(128)

  crypto.pbkdf2(password, salt, iter, hashLen, algo, function (err, hash) {
    if (err) return cb(err)

    db.set(username, {
      salt: salt,
      iterations: iter,
      hashLen: hashLen,
      algo: algo,
      hash: hash
    })

    cb(null, true)
  })
}

function login (username, password, cb) {
  var usr = db.get(username)

  if (usr == null) return false

  crypto.pbkdf2(password, usr.salt, usr.iterations, usr.hashLen, usr.algo, function (err, hash) {
    if (err) return cb(err)

    cb(null, hash.equals(usr.hash))
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
