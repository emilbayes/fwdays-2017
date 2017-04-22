var db = require('./db')
var pwd = require('secure-password')({
  memlimit: 1024 * 1024 * 512,
  opslimit: 10
})

function register (username, password) {
  setTimeout(function () {
    console.log('hash')
  })
  var hash = pwd.hashSync(password)
  db.set(username, hash)
}

function login (username, password) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  setImmediate(function () {
    console.log('verify')
  })
  return pwd.verifySync(password, savedHash)
}

register('emilbayes', Buffer.from('secret'))
console.log(login('emilbayes', Buffer.from('secret')))
console.log(login('emilbayes', Buffer.from('secret2')))
