const Messenger = require('../src/messenger')
const strpad = require('strpad')
const { critical } = require('../src/messenger')

const titleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
// Messenger.clear()

// Messenger.critical('test')
// Messenger.critical('test', 'critical')
// Messenger.critical('test', 'critical', true)

let obj = { fname: 'Mike', lname: 'Erickson', kids: ['Joelle', 'Brady', 'Bailey', 'Trevor'] }
let names = ['mike', 'erickson']
let methods = [
  'critical',
  'danger',
  'debug',
  'error',
  'important',
  'info',
  'log',
  'note',
  'notice',
  'status',
  'success',
  'warn',
  'warning'
]

// let colors = Messenger.messageColors('critical')
// console.log(colors)

console.log('')

methods.forEach(method => {
  let colors = Messenger.messageColors(method)
  console.log('')
  let header = `\u001b[${colors.fg}` + method.toLocaleUpperCase() + '\u001b[39m'
  Messenger.center(` ${header} `, `\u001b[${colors.fg}*\u001b[39m`)
  let colorLabel = `\u001b[${colors.fg}` + method + ' colors:' + '\u001b[39m'

  console.log('')
  colorLabel = Messenger['lbl' + titleCase(method)](`${(method + ' colors').toLocaleUpperCase()}`)
  console.log(colorLabel, colors)
  console.log('')
  Messenger[method](obj, 'OBJECT')
  console.log('')
  Messenger[method](names, 'ARRAY')
  console.log()
})
