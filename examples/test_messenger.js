const colors = require('chalk')
const messenger = require('../src/messenger')
messenger.initLogger(true, 'logs', 'messenger')

let showIcon = true
let showLabel = true
console.log('')

let commands = [
  'critical',
  'error',
  'success',
  'warning',
  'warn',
  'important',
  'info',
  'note',
  'notice',
  'log',
  'debug',
  'status'
]

let testObj = { fname: 'Mike', lname: 'Erickson' }

commands.forEach(command => {
  messenger[command](`test ${command}`)
  messenger[command](testObj)
  messenger[command]([command, 'mike', 'joseph', 'erickson'])
  messenger[command]([command, 'mike', 'joseph', 'erickson'], command.toUpperCase())
  messenger[command](
    [command, 'mike', 'joseph', 'erickson'],
    showLabel ? command.toUpperCase() : '',
    showIcon
  )
  console.log('')
})

messenger.info('Lines displayed width of terminal window')
messenger.line('=')
messenger.line('.')
messenger.line('_')
console.log('')
console.log('')
messenger.center('message centered in available terminal window')
messenger.center('alternate message')
console.log('')

messenger.center(colors.green('message centered in available terminal window'))
messenger.center(colors.magenta('alternate message'))
console.log('')

messenger.dump('this', 'is', 'a', 'test')
messenger.dd('this', 'is', 'from', 'die dump (dd)')
