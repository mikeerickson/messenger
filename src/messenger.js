/*-------------------------------------------------------------------------------------------
 * @codedungeon/messenger
 *
 * Copyright (c) 2020-2021 Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

const os = require('os')
const colors = require('chalk')
const utils = require('./utils')
const Logger = require('./logger')
const clearCli = require('cli-clear')
const stripAnsi = require('strip-ansi')
let windowSize = require('window-size')
const { dd, dump } = require('dumper.js')
const { format, getMilliseconds, isThisISOWeek } = require('date-fns')
const homedir = require('node-homedir')
const path = require('path')

const pkgInfo = require('../package.json')

/* istanbul ignore next */
if (windowSize === undefined) {
  // this is required when message executed in non terminal window -- such as VSCode code runner
  windowSize = { width: 100 }
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
    this.systemLog = false
    this.appName = '@codedungeon/messenger'
    this.logToFile = false
    this.methods = [
      'write',
      'critical',
      'lblCritical',
      'danger',
      'lblDanger',
      'debug',
      'error',
      'lblError',
      'important',
      'lblImportant',
      'info',
      'lblInfo',
      'log',
      'note',
      'notice',
      'lblNotice',
      'status',
      'success',
      'lblSuccess',
      'warn',
      'lblWarn',
      'warning',
      'lblWarning'
    ]
  }

  /**
   * icons
   *
   * @param {*} type
   * @return {*}
   * @memberof Messenger
   */
  icons(type) {
    return utils.icons(type)
  }

  /**
   * messageColors
   *
   * @param {string} [type='info']
   * @return {*}
   * @memberof Messenger
   */
  messageColors(type = 'info') {
    return utils.messageColors(type)
  }

  /**
   * version
   *
   * @return {*}
   * @memberof Messenger
   */
  version() {
    return pkgInfo.version
  }

  /**
   * alert
   *
   * @param {object} [config={}]
   * @return {*}
   * @memberof Messenger
   */
  alert(config = {}) {
    let alertConfig = this.validateConfig(Object.assign({ type: 'info', msg: '', icon: false }, config))
    return this[alertConfig.type](alertConfig.msg, alertConfig.label, alertConfig.icon)
  }

  /**
   *
   *
   * @param {*} [config={}]
   * @return {*}
   * @memberof Messenger
   */
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
    if (logDir === 'system') {
      if (process.platform === 'win32') {
        logDir = path.join(homedir(), 'Library', 'Logs')
      }

      if (process.platform === 'darwin') {
        logDir = path.join(homedir(), 'Library', 'Logs')
      }

      this.systemLog = true
    }
    this.logToFile = logToFile
    this.appName = appName
    this.logger = new Logger({ path: logDir, appName, system: this.systemLog })
    this.methods = this.logger.methods()
  }

  clearLog() {
    this.logger.clear()
  }

  disableLog() {
    this.logToFile = false
  }

  enableLog() {
    this.logToFile = true
  }

  /* istanbul ignore next */
  /**
   * writeToLog
   *
   * @param {string} [type=""]
   * @param {*} args
   * @memberof Messenger
   */
  writeToLog(type = '', label = '', msg = '', forceLogToFile = false) {
    if (this.logToFile || forceLogToFile) {
      if (this.methods.includes(type)) {
        let output = stripAnsi(msg).replace(/\n/gi, ' - ')
        if (this.logger) {
          return this.logger[type](output)
        }
      }
    }
    return ''
  }

  /**
   * clear
   *
   * @memberof Messenger
   */
  clear() {
    clearCli()
  }

  /**
   * loggerWrite
   *
   * @param {*} type (default: log)
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerWrite(type = 'log', msg = '') {
    this.writeToLog(type, '', msg, true)
    return msg
  }

  /**
   * write
   *
   * @param {string} [type="log"]
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  write(type = '', msg = '') {
    let label = ''
    let showIcon = false
    let icon = showIcon ? utils.icons('critical') + '  ' : ''
    msg = utils.formatMessage(msg)
    let output = `${colors.bgKeyword('orangered').black(label)}${label ? ' ' : ''}${icon}${colors.keyword(
      'orangered'
    )(msg)}`

    if (this !== undefined) {
      this.writeToLog(type, label, msg)
    }
    return output
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
  critical(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('critical') + '  ' : ''
    msg = utils.formatMessage(msg)
    let output = `${colors.bgKeyword('orangered').black(label)}${label ? ' ' : ''}${icon}${colors.keyword(
      'orangered'
    )(msg)}`

    print(output)
    if (this !== undefined) {
      this.writeToLog('critical', label, msg)
    }
    return output
  }

  lblCritical(label = '') {
    return colors.bgKeyword('orangered').black(` ${label} `)
  }

  /**
   * loggerCritical
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerCritical(msg = '') {
    return this.writeToLog('critical', '', msg, true)
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
  error(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('error') + ' ' : ''
    msg = utils.formatMessage(msg)
    let output = `${colors.bgRed.black(label)}${label ? ' ' : ''}${colors.red(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('error', label, msg)
    }
    return output
  }

  lblError(label = '') {
    return colors.bgRed.black(` ${label} `)
  }

  /**
   * loggerError
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerError(msg = '') {
    return this.writeToLog('error', '', msg, true)
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
  danger(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('danger') + ' ' : ''
    msg = utils.formatMessage(msg)
    let output = `${colors.bgRed.black(label)}${label ? ' ' : ''}${colors.red(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('danger', label, msg)
    }
    return output
  }

  lblDanger(label = '') {
    return colors.bgRed.black(` ${label} `)
  }

  /**
   * loggerDanger
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerDanger(msg = '') {
    return this.writeToLog('danger', '', msg, true)
  }

  /**
   * success
   *
   * @param {object | string} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  success(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''

    let icon = showIcon ? utils.icons('success') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgGreen.black(label)}${label ? ' ' : ''}${colors.green(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('success', label, msg)
    }
    return output
  }

  lblSuccess(label = '') {
    return colors.bgGreen.black(` ${label} `)
  }

  /**
   * loggerSuccess
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerSuccess(msg = '') {
    return this.writeToLog('success', '', msg, true)
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
  warning(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('warning') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('warning', label, msg)
    }
    return output
  }

  lblWarning(label = '') {
    return colors.bgYellow.black(` ${label} `)
  }

  /**
   * loggerWarning
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerWarning(msg = '') {
    return this.writeToLog('warning', '', msg, true)
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
  warn(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('warn') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('warn', label, msg)
    }
    return output
  }

  lblWarn(label = '') {
    return colors.bgYellow.black(` ${label} `)
  }

  /**
   * loggerWarn
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerWarn(msg = '') {
    return this.writeToLog('warn', '', msg, true)
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
  important(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('important') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgYellow.black(label)}${label ? ' ' : ''}${colors.yellow(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('important', label, msg)
    }
    return output
  }

  lblImportant(label = '') {
    return colors.bgYellow.black(` ${label} `)
  }

  /**
   * loggerImportant
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerImportant(msg = '') {
    return this.writeToLog('important', '', msg, true)
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
  info(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('info') + ' ' : ''

    msg = utils.formatMessage(msg)

    let output = `${colors.bgCyan.black(label)}${label ? ' ' : ''}${colors.cyan(icon + msg)}`

    print(output)
    if (this !== undefined) {
      this.writeToLog('info', label, msg)
    }

    return output
  }

  lblInfo(label = '') {
    return colors.bgCyan.black(` ${label} `)
  }

  /**
   * loggerInfo
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerInfo(msg = '') {
    return this.writeToLog('info', '', msg, true)
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

  debug(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('debug') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgKeyword('darkgray').black(label)}${label ? ' ' : ''}${colors.gray(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('debug', label, msg)
    }
    return output
  }

  lblDebug(label = '') {
    return colors.bgKeyword('darkgray').black(` ${label} `)
  }

  /**
   * loggerDebug
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerDebug(msg = '') {
    return this.writeToLog('debug', '', msg, true)
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
  log(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('log') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgWhite.black(label)}${label ? ' ' : ''}${icon + msg}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('log', label, msg)
    }
    return output
  }

  lblLog(label = '') {
    return colors.bgWhite.black(` ${label} `)
  }

  /**
   * loggerLog
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerLog(msg = '') {
    return this.writeToLog('log', '', msg, true)
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
  status(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('status') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgMagenta.black(label)}${label ? ' ' : ''}${colors.magenta(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('status', label, msg)
    }
    return output
  }

  lblStatus(label = '') {
    return colors.bgMagenta.black(` ${label} `)
  }

  /**
   * loggerStatus
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerStatus(msg = '') {
    return this.writeToLog('status', '', msg, true)
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
  notice(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('notice') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgBlue.black(label)}${label ? ' ' : ''}${colors.blue(icon + msg)}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('notice', label, msg)
    }
    return output
  }

  lblNotice(label = '') {
    return colors.bgBlue.black(` ${label} `)
  }

  /**
   * loggerNotice
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerNotice(msg = '') {
    return this.writeToLog('notice', '', msg, true)
  }

  /**
   * note
   *
   * @param {*} msg
   * @param {string} [label=""]
   * @param {boolean} [showIcon=false]
   * @returns
   * @memberof Messenger
   */
  note(msg = '', label = '', showIcon = false) {
    label = label ? ' ' + label + ' ' : ''
    let icon = showIcon ? utils.icons('note') + ' ' : ''

    msg = utils.formatMessage(msg)
    let output = `${colors.bgKeyword('orange').black(label)}${label ? ' ' : ''}${colors.keyword('orange')(
      icon + msg
    )}`
    print(output)
    if (this !== undefined) {
      this.writeToLog('note', label, msg)
    }
    return output
  }

  lblNote(label = '') {
    return colors.bgKeyword('orange').black(` ${label} `)
  }

  /**
   * loggerNote
   *
   * @param {*} msg
   * @returns
   * @memberof Messenger
   */
  loggerNote(msg = '') {
    return this.writeToLog('note', '', msg, true)
  }

  /* istanbul ignore next */

  /**
   * processing
   *
   * @param {*} msg
   * @memberof Messenger
   */
  processing(msg = '') {
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
    return utils.icons
  }

  /**
   * validateConfig
   *
   * @param {*} [config={}]
   * @return {*}
   * @memberof Messenger
   */
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
exports.write = new Messenger().critical

exports.critical = new Messenger().critical
exports.lblCritical = new Messenger().lblCritical

exports.danger = new Messenger().danger
exports.lblDanger = new Messenger().lblDanger

exports.error = new Messenger().error
exports.lblError = new Messenger().lblError

exports.success = new Messenger().success
exports.lblSuccess = new Messenger().lblSuccess

exports.warning = new Messenger().warning
exports.lblWarning = new Messenger().lblWarning

exports.warn = new Messenger().warn
exports.lblWarn = new Messenger().lblWarning

exports.important = new Messenger().important
exports.important = new Messenger().lblImportant

exports.info = new Messenger().info
exports.lblInfo = new Messenger().lblInfo

exports.notice = new Messenger().notice
exports.lblNotice = new Messenger().lblNotice

exports.status = new Messenger().status
exports.status = new Messenger().lblStatus

exports.debug = new Messenger().debug
exports.lblDebug = new Messenger().lblDebug

exports.log = new Messenger().log
exports.lblLog = new Messenger().lblLog

exports.dd = new Messenger().dd
exports.dump = new Messenger().dump
exports.terminalInfo = new Messenger().terminalInfo
exports.center = new Messenger().center
exports.line = new Messenger().line
exports.icons = new Messenger().icons
exports.getIcons = new Messenger().getIcons
exports.messageColors = new Messenger().messageColors

module.exports = new Messenger()
