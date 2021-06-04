# @codedungeon/messenger

## Description

Messenger is a simple node module for displaying pretty console logs (with lots of formatting options) and support for logging messages to `.log` files (including daily rotation)

![Screenshot](https://github.com/mikeerickson/messenger/blob/master/docs/messenger-example.png)

## Install

```bash
> npm install @codedungeon/messenger
```

## Usage

```js
const msg = require('@codedungeon/messenger')
const pkgInfo = require('./package.json')
msg.initLogger(true, 'logs', pkgInfo.name)

console.log('')
let showIcons = false
let showLabels = false

msg.critical('critical message', showLabels ? 'CRITICAL' : '', showIcons)
msg.danger('critical message', showLabels ? 'DANGER' : '', showIcons)
msg.error('error message', showLabels ? 'ERROR' : '', showIcons)
msg.success('success message', showLabels ? 'SUCCESS' : '', showIcons)
msg.warning('warning message', showLabels ? 'WARNING' : '', showIcons)
msg.important('important message', showLabels ? 'IMPORTANT' : '', showIcons)
msg.warn('warn message', showLabels ? 'WARN' : '', showIcons)
msg.notice('notice message', showLabels ? 'NOTICE' : '', showIcons)
msg.note('note message', showLabels ? 'NOTE' : '', showIcons)
msg.status('status message', showLabels ? 'STATUS' : '', showIcons)
msg.info('info message', showLabels ? 'INFO' : '', showIcons)
msg.debug('debug message', showLabels ? 'DEBUG' : '', showIcons)
```

If you want to pass a standard JavaScript `object` or `array` Messenger will use the `dump` method to display message, and if you supply `label` parameter, it will be displayed first and then message will be displayed (see the `./examples/test-messenger-obj.js` example method for further information)

```js
let obj = { fname: 'Mike', lname: 'Erickson', kids: ['Joelle', 'Brady', 'Bailey', 'Trevor'] }
Messenger.success(obj, 'FAMILY')
```

### Using `alert` helper

You can also invoke any of the Messenger methods using the `alert` helper which accepts an object of options as opposed to passing the 3 separate parameters

Note: This method does **not** support calling statically

```js
type - default "info"
msg  - notification message
icon - default "false"

alert({ type: 'info', msg: 'hello world', icon: false })
print({ type: 'info', msg: 'hello world', icon: false })
```

```js
let msg = 'Hello World'
messenger.alert({ msg })
messenger.alert({ type: 'status', msg, label: '', icon: false })
messenger.alert({ type: 'status', msg, label: 'STATUS', icon: false })
messenger.alert({ type: 'status', msg, label: 'STATUS', icon: true })
```

### Using `print` helper (same options as `alert`)

Or, if you choose, you can use the `print` helper

```js
let msg = 'Hello World'
messenger.print({ type: 'success', msg })
messenger.print({ type: 'success', msg, label: 'SUCCESS', icon: false })
messenger.print({ type: 'success', msg, label: 'SUCCESS', icon: true })
```

### Logger

Messenger includes a simple logging interface which log all console logging to persisted log files

#### Logger Methods

**initLogger(logToFile: boolean, path: string, name: string)**
**writeToLog(type: string, args: object, forceLogToFile: boolean)**
**loggerCritical(msg: string)**
**loggerError(msg: string)**
**loggerStatus(msg: string)**
**loggerWarning(msg: string)**
**loggerWarn(msg: string)**
**loggerImportant(msg: string)**
**loggerInfo(msg: string)**
**loggerDebug(msg: string)**
**loggerLog(msg: string)**
**loggerStatus(msg: string)**
**loggerNotice(msg: string)**
**loggerNote(msg: string)**
**disableLog()**
**enableLog()**

#### Using `initLogger`

Using the `initLogger` method at the start of your CLI process, you can determine the location of log files

The following is the basic workflow for initializing Messneger Logger.

```js
// get package information to pass along logger name
let pkgInfo = require('./package.json')

const Messenger = require('../src/messenger')

// initialize logger, defining the directory where logs are stored
Messenger.initLogger(true, 'logs', pkgInfo.name)
```

#### Log Files

Logger will create a unique log file, each day using the following syntax

```bash
<name>-yyyy-mm-dd.log
```

#### System Logger

In addition to defining the `logs` location, you can also use a reserved name `system` which will create log files using the operating system log directory

```js
...
Messenger.initLogger(true, 'system', pkgInfo.name)
...
```

This will create a single log file for defined `name`

##### Mac OS

```bash
<home>/System/Logs/<name>.log
```

##### Windows

// TODO: Setup Windows Logging

```bash
c:\<home>
```

## License

Copyright &copy; 2019-2021 Mike Erickson
Released under the MIT license

## Credits

messenger written by Mike Erickson

E-Mail: [mike.erickson@codedungeon.io](mailto:mike.erickson@codedungeon.io)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](http://codedungeon.io)
