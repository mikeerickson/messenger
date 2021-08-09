const Messenger = require('../index')
const {
  lblCritical,
  lblInfo,
  lblNotice,
  lblNote,
  lblSuccess,
  lblError,
  lblDanger,
  lblImportant,
  lblStatus,
  lblWarn,
  lblWarning,
  lblLog,
  lblDebug
} = require('../index')

console.log('')
console.log(lblCritical('CRITICAL') + ' ' + 'Hello World')

console.log('')
console.log(lblDanger('DANGER') + ' ' + 'Hello World')

console.log('')
console.log(lblImportant('IMPORTANT') + ' ' + 'Hello World')

console.log('')
console.log(lblWarn('WARN') + ' ' + 'Hello World')

console.log('')
console.log(lblWarn('WARNING') + ' ' + 'Hello World')

console.log('')
console.log(lblSuccess('SUCCESS') + ' ' + 'Hello World')

console.log('')
console.log(lblError('ERROR') + ' ' + 'Hello World')

console.log('')
console.log(lblNote('NOTE') + ' ' + 'Hello World')

console.log('')
console.log(lblNotice('NOTICE') + ' ' + 'Hello World')

console.log('')
console.log(lblNotice('STATUS') + ' ' + 'Hello World')

console.log('')
console.log(lblNotice('INFO') + ' ' + 'Hello World')

console.log('')
console.log(lblLog('LOG') + ' ' + 'Hello World')

console.log('')
console.log(lblDebug('DEBUG') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblDebug('DEBUG') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblLog('LOG') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblNotice('INFO') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblNotice('STATUS') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblNotice('NOTICE') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblNote('NOTE') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblError('ERROR') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblSuccess('SUCCESS') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblWarn('WARNING') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblWarn('WARN') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblDanger('DANGER') + ' ' + 'Hello World')

console.log('')
console.log(Messenger.lblImportant('IMPORTANT') + ' ' + 'Hello World')

console.log('')
console.log('')

console.log(Messenger.lblInfo('INFO') + ' ' + 'Hello World')
console.log('')
console.log(Messenger.lblSuccess('SUCCESS') + ' ' + 'Hello World')
console.log('')
console.log(Messenger.lblWarning('WARNING') + ' ' + 'Hello World')
console.log('')
console.log(Messenger.lblError('ERROR') + ' ' + 'Hello World')
