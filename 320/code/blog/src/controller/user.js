const login = (username, password) => {
  if (username === 'negrochn' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  login
}