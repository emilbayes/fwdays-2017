var db = require('./db')
var pwd = require('secure-password')()

function register (username, password) {
  var hash = pwd.hashSync(password)
  db.set(username, hash)
}

function login (username, password) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  return pwd.verifySync(password, savedHash)
}

register('emilbayes', Buffer.from('secret'))
console.log(login('emilbayes', Buffer.from('secret')))
console.log(login('emilbayes', Buffer.from('secret2')))
