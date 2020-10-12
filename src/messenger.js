const os = require('os')
const colors = require('chalk')
const Logger = require('./logger')
const stripAnsi = require('strip-ansi')
const { dd, dump } = require('dumper.js')
const pkgInfo = require('../package.json')
const { format, getMilliseconds } = require('date-fns')

let windowSize = require('window-size')

/* istanbul ignore next */
const padZero = (num = 0, size = 3) => {
  return ('000000000' + num).substr(-size)
}
/* istanbul ignore next */
if (windowSize === undefined) {
  // this is required when message executed in non terminal window -- such as VSCode code runner
  windowSize = { width: 100 }
}

const messageColors = {
  critical: { fg: '38m', bg: '48m' },
  error: { fg: '31m', bg: '41m' },
  success: { fg: '32m', bg: '42m' },
  warn: { fg: '33m', bg: '43m' },
  warning: { fg: '33m', bg: '43m' },
  info: { fg: '36m', bg: '46m' },
  debug: { fg: '90m', bg: '48m' },
  log: { fg: '37m', bg: '47m' },
  note: { fg: '38m', bg: '48m' },
  notice: { fg: '34m', bg: '44m' },
  important: { fg: '33m', bg: '43m' },
  status: { fg: '35m', bg: '45m' }
}

/* istanbul ignore next */
if (os.platform() === 'linux') {
  messageColors.critical.fg = '001b[91m'
  messageColors.critical.bg = '001b[101m'
  messageColors.note.fg = '001b[93m'
  messageColors.note.bg = '001b[103m'
  messageColors.debug.fg = '001b[90m'
  messageColors.debug.bg = '001b[47m'
}

/**
 * print
 *
 * @param {string} [type=""]
 * @param {*} args
 * @memberof Messenger
 */
const print = args => {
  // console.log(args);
  // this has been disabled, using jest function mock instead
  /* istanbul ignore next */
  process.env.NODE_ENV === 'test' ? null : console.log(args)
}

/**
 * formatMessage
 *
 * @param {*} msg
 * @returns
 * @memberof Messenger
 */
const formatMessage = msg => {
  let result = msg
  if (typeof msg === 'object') {
    if (Array.isArray(msg)) {
      result = msg.toString().replace(/,/gi, ' ')
    } else {
      result = JSON.stringify(msg)
      result = result.replace(/,/gi, ', ').replace(/:/gi, ': ')
    }
  }
  return result
}

/**
 * Messenger
 *
 * @class Messenger
 */
class Messenger {
  /**
   *Creates an instance of Messenger.
   * @memberof Messenger
   */
  /**
   *Creates an instance of Messenger.
   * @memberof Messenger
   */
  constructor() {
    this.appName = '@codedungeon/messenger'
    this.logToFile = false
    this.messageColors = messageColors
    this.methods = [
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
    this.icons = {
      critical: '🚫',
      danger: '🚫',
      error: '✖',
      success: '✔',
      warn: '⚠️',
      warning: '⚠️',
      info: '⌽',
      info_alt: '💡',
      important: '★',
      status: '◯',
      notice: '◉',
      note: '◉',
      log: '⇢',
      debug: '◼'
    }
  }
  /**
   * version
   *
   * @returns
   * @memberof Messenger
   */
  version() {
    return pkgInfo.version
  }
  alert(config = {}) {
    let alertConfig = this.validateConfig(Object.assign({ type: 'info', msg: '', icon: false }, config))
    return this[alertConfig.type](alertConfig.msg, alertConfig.label, alertConfig.icon)
  }
  print(config = {}) {
    let alertConfig = this.validateConfig(Object.assign({ type: 'info', msg: '', icon: false }, config))
    return this[alertConfig.type](alertConfig.msg, alertConfig.label, alertConfig.icon)
  }
  /* istanbul ignore next */
  /**
   * initLogger
   *
   * @param {boolean} [logToFile=false]
   * @param {string} [logDir="logs"]
   * @param {string} [appName="app"]
   * @memberof Messenger
   */
  initLogger(logToFile = false, logDir = 'logs', appName = 'app') {
    this.logToFile = logToFile
    this.appName = appName
    this.logger = new Logger({ path: logDir, appName })
    this.methods = this.logger.methods()
  }
  /* istanbul ignore next */
  /**
   * writeToLog
   *
   * @param {string} [type=""]
   * @param {*} args
   * @memberof Messenger
   */
  writeToLog(type = '', args, forceLogToFile = false) {
    if (this.logToFile || forceLogToFile) {
      if (this.methods.includes(type)) {
        return this.logger[type](stripAnsi(args).replace(/\n/gi, ' - '))
      }
    }
    return ''
  }
  /**
   * critical
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  critical(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.critical + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgKeyword('orangered').black(label)}${label ? ' ' : ''}${icon}${colors.keyword(
      'orangered'
    )(msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('critical', output)
    }
    return output
  }

  /**
   * loggerCritical
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerCritical(msg) {
    return this.writeToLog('critical', msg, true)
  }
  /**
   * error
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  error(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.error + ' ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgRed.black(label)}${label ? ' ' : ''}${colors.red(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('error', output)
    }
    return output
  }
  /**
   * danger
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  danger(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.danger + ' ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgRed.black(label)}${label ? ' ' : ''}${colors.red(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('error', output)
    }
    return output
  }
  /**
   * loggerError
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerError(msg) {
    return this.writeToLog('error', msg, true)
  }
  /**
   * success
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  success(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.success + ' ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgGreen.black(label)}${label ? ' ' : ''}${colors.green(icon + msg)}`

    print(output)
    if (this !== undefined) {
      this.writeToLog('success', output)
    }
    return output
  }
  /**
   * loggerSuccess
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerSuccess(msg) {
    return this.writeToLog('success', msg, true)
  }
  /**
   * warning
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  warning(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.warning + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('warning', output)
    }
    return output
  }
  /**
   * loggerWarning
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerWarning(msg) {
    return this.writeToLog('warning', msg, true)
  }
  /**
   * warn
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  warn(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.warn + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('warn', output)
    }
    return output
  }
  /**
   * loggerWarn
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerWarn(msg) {
    return this.writeToLog('warn', msg, true)
  }
  /**
   * important
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  important(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.important + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('important', output)
    }
    return output
  }
  /**
   * loggerImportant
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerImportant(msg) {
    return this.writeToLog('important', msg, true)
  }
  /**
   * info
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  info(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.info + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgCyan.black(label)}${label ? ' ' : ''}${colors.cyan(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('info', output)
    }
    return output
  }
  /**
   * loggerInfo
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerInfo(msg) {
    return this.writeToLog('info', msg, true)
  }
  /**
   * debug
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  debug(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.debug + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgKeyword('darkgray').black(label)}${label ? ' ' : ''}${colors.gray(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('debug', output)
    }
    return output
  }
  /**
   * loggerDebug
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerDebug(msg) {
    return this.writeToLog('debug', msg, true)
  }
  /**
   * log
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  log(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.log + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgWhite.black(label)}${label ? ' ' : ''}${icon + msg}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('log', output)
    }
    return output
  }
  /**
   * loggerLog
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerLog(msg) {
    return this.writeToLog('log', msg, true)
  }
  /**
   * status
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  status(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.status + '  ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgMagenta.black(label)}${label ? ' ' : ''}${colors.magenta(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('status', output)
    }
    return output
  }
  /**
   * loggerStatus
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerStatus(msg) {
    return this.writeToLog('status', msg, true)
  }
  /**
   * notice
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  notice(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.notice + ' ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgBlue.black(label)}${label ? ' ' : ''}${colors.blue(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('notice', output)
    }
    return output
  }
  /**
   * loggerNotice
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerNotice(msg) {
    return this.writeToLog('notice', msg, true)
  }
  /**
   * notice
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  note(msg, label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? this.icons.note + ' ' : ''
    msg = formatMessage(msg)
    let output = `${colors.bgKeyword('orange').black(label)}${label ? ' ' : ''}${colors.keyword('orange')(
      icon + msg
    )}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('note', output)
    }
    return output
  }
  /**
   * loggerNote
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerNote(msg) {
    return this.writeToLog('note', msg, true)
  }
  /**
   * processing
   *
   * @param {*} msg
   * @memberof Messenger
   */
  /* istanbul ignore next */
  processing(msg) {
    console.log(colors.yellow(msg))
  }
  /**
   * timestamp
   *
   * @param {boolean} [useAMPM=false]
   * @param {boolean} [showSeconds=true]
   * @param {boolean} [showMicro=false]
   * @returns
   * @memberof Messenger
   */
  /* istanbul ignore next */
  timestamp(useAMPM = false, showSeconds = true, showMicro = false) {
    let tsd = new Date()
    let tsFormat = showSeconds ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd HH:mm'
    tsFormat = useAMPM ? tsFormat + ' a' : tsFormat
    let ms = showMicro && !useAMPM ? '.' + padZero(getMilliseconds(tsd), 3) : ''
    return format(tsd, tsFormat) + ms
  }
  /**
   * terminalInfo
   *
   * @returns
   * @memberof Messenger
   */
  terminalInfo() {
    return windowSize
  }
  /**
   * dd (die dump)
   *
   * @param {*} data
   * @memberof Messenger
   */
  /* istanbul ignore next */
  dd(...data) {
    dd(data)
  }
  /**
   * dump
   *
   * @param {*} data
   * @memberof Messenger
   */
  /* istanbul ignore next */
  dump(...data) {
    dump(data)
  }
  /**
   * line
   *
   * @param {string} [msg=""]
   * @memberof Messenger
   */
  /* istanbul ignore next */
  line(msg = '') {
    let output = msg
    if (windowSize !== undefined) {
      output = msg.repeat(windowSize.width - 2, msg)
    }
    print(output)
    return output
  }
  /**
   * center
   *
   * @param {string} [msg=""]
   * @param {string} [fillText=" "]
   * @memberof Messenger
   */
  /* istanbul ignore next */
  center(msg = '', fillText = ' ') {
    // if the terminal width is shorter than message length, dont display fillText
    let width = windowSize === undefined ? 100 : windowSize.width
    if (stripAnsi(msg).length >= width) {
      print(msg)
      return msg
    } else {
      let left = parseInt((width - stripAnsi(msg).length) / 2, 10)
      let padStr = fillText.repeat(left / stripAnsi(fillText).length)
      let output = padStr + msg + padStr
      print(output)
      return output
    }
  }
  /**
   * icons
   *
   * @returns
   * @memberof Messenger
   */
  getIcons() {
    return this.icons
  }
  validateConfig(config = {}) {
    let finalConfig = Object.assign(config)
    finalConfig.type = finalConfig.type === '' ? 'info' : finalConfig.type
    if (!this.methods.includes(finalConfig.type)) {
      finalConfig.type = 'info'
    }

    return finalConfig
  }
}

// export all methods so they call be used statically
exports.critical = new Messenger().critical
exports.danger = new Messenger().danger
exports.error = new Messenger().error
exports.success = new Messenger().success
exports.warning = new Messenger().warning
exports.warn = new Messenger().warn
exports.important = new Messenger().important
exports.info = new Messenger().info
exports.notice = new Messenger().notice
exports.status = new Messenger().status
exports.debug = new Messenger().debug
exports.log = new Messenger().log
exports.dd = new Messenger().dd
exports.dump = new Messenger().dump
exports.terminalInfo = new Messenger().terminalInfo
exports.center = new Messenger().center
exports.line = new Messenger().line
exports.icons = new Messenger().icons
exports.getIcons = new Messenger().getIcons
exports.messageColors = new Messenger().messageColors

module.exports = new Messenger()
