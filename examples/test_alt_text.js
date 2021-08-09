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
console.log(Messenger.lblCritical('CRITICAL') + ' ' + 'Hello World')
Messenger.critical('Hello World', 'CRITICAL')

console.log('')
console.log(lblDanger('DANGER') + ' ' + 'Hello World')
console.log(Messenger.lblDanger('DANGER') + ' ' + 'Hello World')
Messenger.danger('Hello World', 'DANGER')

console.log('')
console.log(lblImportant('IMPORTANT') + ' ' + 'Hello World')
console.log(Messenger.lblImportant('IMPORTANT') + ' ' + 'Hello World')
Messenger.important('Hello World', 'IMPORTANT')

console.log('')
console.log(lblWarn('WARN') + ' ' + 'Hello World')
console.log(Messenger.lblWarn('WARN') + ' ' + 'Hello World')
Messenger.warn('Hello World', 'WARN')

console.log('')
console.log(lblWarn('WARNING') + ' ' + 'Hello World')
console.log(Messenger.lblWarn('WARNING') + ' ' + 'Hello World')
Messenger.warning('Hello World', 'WARNING')

console.log('')
console.log(lblSuccess('SUCCESS') + ' ' + 'Hello World')
console.log(Messenger.lblSuccess('SUCCESS') + ' ' + 'Hello World')
Messenger.success('Hello World', 'SUCCESS')

console.log('')
console.log(lblError('ERROR') + ' ' + 'Hello World')
console.log(Messenger.lblError('ERROR') + ' ' + 'Hello World')
Messenger.error('Hello World', 'ERROR')

console.log('')
console.log(lblNote('NOTE') + ' ' + 'Hello World')
console.log(Messenger.lblNote('NOTE') + ' ' + 'Hello World')
Messenger.note('Hello World', 'NOTE')

console.log('')
console.log(lblNotice('NOTICE') + ' ' + 'Hello World')
console.log(lblNotice('NOTICE') + ' ' + 'Hello World')
console.log(Messenger.lblNotice('NOTICE') + ' ' + 'Hello World')
Messenger.notice('Hello World', 'NOTICE')

console.log('')
console.log(lblNotice('STATUS') + ' ' + 'Hello World')
console.log(Messenger.lblNotice('STATUS') + ' ' + 'Hello World')
Messenger.status('Hello World', 'STATUS')

console.log('')
console.log(lblNotice('INFO') + ' ' + 'Hello World')
console.log(Messenger.lblNotice('INFO') + ' ' + 'Hello World')
Messenger.info('Hello World', 'INFO')

console.log('')
console.log(lblLog('LOG') + ' ' + 'Hello World')
console.log(Messenger.lblLog('LOG') + ' ' + 'Hello World')
Messenger.log('Hello World', 'LOG')

console.log('')
console.log(lblDebug('DEBUG') + ' ' + 'Hello World')
console.log(Messenger.lblDebug('DEBUG') + ' ' + 'Hello World')
Messenger.debug('Hello World', 'DEBUG')

// Messenger.info(reset('Hello World'), 'INFO')
