var db = require('./db')
var crypto = require('crypto')

function register (username, password) {
  var hash = crypto.createHash('md5').update(password).digest()
  db.set(username, hash)
}

function login (username, password) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  var hash = crypto.createHash('md5').update(password).digest()
  if (savedHash.equals(hash) === false) return false

  return true
}

register('emilbayes', Buffer.from('secret'))
console.log(login('emilbayes', Buffer.from('secret')))
console.log(login('emilbayes', Buffer.from('secret2')))
