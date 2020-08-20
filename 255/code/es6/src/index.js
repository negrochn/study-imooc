const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: fs.createReadStream('./index.html')
})

let lineNum = 0
rl.on('line', (line) => {
  console.log(line)
  lineNum++
})
rl.on('close', () => {
  console.log(lineNum)
})