var db = require('./db')
var crypto = require('crypto')

function register (username, password) {
  var hash = crypto.createHash('md5')
    .update(password)
    .digest()
  db.set(username, hash)
}

function login (username, password) {
  var savedHash = db.get(username)

  if (savedHash == null) return false

  var hash = crypto.createHash('md5')
    .update(password)
    .digest()
  if (savedHash.equals(hash) === false) return false

  return true
}

register('emilbayes', Buffer.from('secret'))

// Attacker stole the database

var fs = require('fs')
console.time('rainbow')
var dictionary = fs.readFileSync('/usr/share/dict/words', 'utf8')

var words = dictionary.split('\n')

var rainbowTable = words.map(function (word) {
  return crypto.createHash('md5').update(word).digest()
})

for (var i = 0; i < rainbowTable.length; i++) {
  if (rainbowTable[i].equals(db.get('emilbayes'))) {
    console.log(words[i])
    break
  }
}
console.timeEnd('rainbow')
