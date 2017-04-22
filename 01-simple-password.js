var db = require('./db')

function register (username, password) {
  db.set(username, password)
}

function login (username, password) {
  var savedPassword = db.get(username)

  if (savedPassword == null) return false
  if (savedPassword.equals(password) === false) return false

  return true
}

register('emilbayes', Buffer.from('secret'))
console.log(login('emilbayes', Buffer.from('secret')))
console.log(login('emilbayes', Buffer.from('secret2')))
