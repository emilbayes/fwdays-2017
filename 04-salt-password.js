var db = require('./db')
var crypto = require('crypto')

function register (username, password) {
  var salt = crypto.randomBytes(64)
  var hash = crypto.createHash('md5')
    .update(salt)
    .update(':')
    .update(password)
    .digest()

  db.set(username, {salt: salt, hash: hash})
}

function login (username, password) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  var hash = crypto.createHash('md5')
    .update(savedHash.salt)
    .update(':')
    .update(password)
    .digest()
  if (savedHash.hash.equals(hash) === false) return false

  return true
}

register('emilbayes', Buffer.from('secret'))
console.log(login('emilbayes', Buffer.from('secret')))
console.log(login('emilbayes', Buffer.from('secret2')))
