const colors = require("chalk");
const repeating = require("repeating");
const windowSize = require("window-size");
const { dd, dump } = require("dumper.js");
const stripAnsi = require("strip-ansi");
const Logger = require("./logger");

const print = args => {
  process.env.NODE_ENV === "test" ? null : console.log(args);
};

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
    this.logToFile = false;
    this.appName = "app";
    this.icons = {
      critical: "🚫",
      error: "✖",
      success: "✔",
      warning: "⚠️",
      info: "💡",
      important: "★",
      status: "◯",
      notice: "◉",
      log: "⇢",
      debug: "◼"
    };
  }
  initLogger(logToFile = false, logDir = "logs", appName = "app") {
    this.logToFile = logToFile;
    this.appName = appName;
    this.methods = [];
    if (this.logToFile) {
      this.logger = new Logger({ path: logDir, appName });
      this.methods = this.logger.methods();
    }
  }

  writeToLog(type = "", args) {
    if (this.logToFile) {
      if (this.methods.includes(type)) {
        this.logger[type](stripAnsi(args).replace(/\n/gi, " - "));
      }
    }
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
  critical(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.critical + "  " : "";
    let output = `${colors.bgKeyword("orangered").black(label)}${label ? " " : ""}${icon}${colors.keyword(
      "orangered"
    )(msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("critical", output);
    }

    return output;
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
  error(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.error + " " : "";
    let output = `${colors.bgRed.black(label)}${label ? " " : ""}${colors.red(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("error", output);
    }
    return output;
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
  success(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.success + " " : "";
    let output = `${colors.bgYellow.black(label)}${label ? " " : ""}${colors.green(icon + msg)}`;

    print(output);
    if (this !== undefined) {
      this.writeToLog("success", output);
    }
    return output;
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
  warning(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.warning + "  " : "";
    let output = `${colors.bgYellow.black(label)}${label ? " " : ""}${colors.yellow(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("warning", output);
    }
    return output;
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
  important(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.important + "  " : "";
    let output = `${colors.bgYellow.black(label)}${label ? " " : ""}${colors.yellow(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("important", output);
    }
    return output;
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
  info(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.info + "  " : "";
    let output = `${colors.bgCyan.black(label)}${label ? " " : ""}${colors.cyan(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("info", output);
    }
    return output;
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
  debug(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.debug + "  " : "";
    let output = `${colors.bgKeyword("darkgray").black(label)}${label ? " " : ""}${colors.gray(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("debug", output);
    }
    return output;
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
  log(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.log + "  " : "";
    let output = `${colors.bgWhite.black(label)}${label ? " " : ""}${colors.white(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("log", output);
    }
    return output;
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
  status(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.status + "  " : "";
    let output = `${colors.bgMagenta.black(label)}${label ? " " : ""}${colors.magenta(icon + msg)}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("status", output);
    }
    return output;
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
  notice(msg, label = "", showIcon = false) {
    label = label ? " " + label + " " : "";
    let icon = showIcon ? this.icons.notice + " " : "";
    let output = `${colors.bgKeyword("orange").black(label)}${label ? " " : ""}${colors.keyword("orange")(
      icon + msg
    )}`;
    print(output);
    if (this !== undefined) {
      this.writeToLog("notice", output);
    }
    return output;
  }
  /**
   * processing
   *
   * @param {*} msg
   * @memberof Messenger
   */
  /* istanbul ignore next */
  processing(msg) {
    console.log(colors.yellow(msg));
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
    return this.formatDate(new Date(), useAMPM, showSeconds, showMicro);
  }
  /**
   * formatDate
   *
   * @param {string} [date=""]
   * @param {boolean} [useAMPM=true]
   * @param {boolean} [showSeconds=true]
   * @param {boolean} [showMicro=false]
   * @returns
   * @memberof Messenger
   */
  /* istanbul ignore next */
  formatDate(date = "", useAMPM = true, showSeconds = true, showMicro = false) {
    // ==================================================================
    // convert nulls to default params
    // ==================================================================
    if (!useAMPM) {
      useAMPM = false;
    }
    if (!showSeconds) {
      showSeconds = false;
    }
    if (!showMicro) {
      showMicro = false;
    }

    // ==================================================================
    showMicro = useAMPM ? false : showMicro;
    showSeconds = showMicro ? true : showSeconds;

    date = date === "" || date === null ? (date = new Date()) : date;

    // build time
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let micro = date.getMilliseconds();
    let ampm = "";

    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (showSeconds) {
      seconds = seconds < 10 ? "0" + seconds : seconds;
      seconds = ":" + seconds;
    } else {
      seconds = "";
    }
    if (useAMPM) {
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours < 10 ? "0" + hours : hours;
    }

    micro = showMicro && !useAMPM ? "." + micro : "";
    micro = useAMPM ? "" : micro;

    let strTime = `${hours}:${minutes}${seconds}${micro} ${ampm}`;

    // build date
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;

    let strDate = `${date.getFullYear()}-${month}-${day}`;
    return `${strDate} ${strTime}`;
  }
  /**
   * terminalInfo
   *
   * @returns
   * @memberof Messenger
   */
  terminalInfo() {
    return windowSize;
  }
  /**
   * dd (die dump)
   *
   * @param {*} data
   * @memberof Messenger
   */
  /* istanbul ignore next */
  dd(data) {
    dd(data);
  }
  /**
   * dump
   *
   * @param {*} data
   * @memberof Messenger
   */
  /* istanbul ignore next */
  dump(data) {
    dump(data);
  }
  /**
   * line
   *
   * @param {string} [msg=""]
   * @memberof Messenger
   */
  /* istanbul ignore next */
  line(msg = "") {
    let output = repeating(windowSize.width, msg);
    print(output);
    return output;
  }
  /**
   * center
   *
   * @param {string} [msg=""]
   * @param {string} [fillText=" "]
   * @memberof Messenger
   */
  /* istanbul ignore next */
  center(msg = "", fillText = " ") {
    // if the terminal width is shorter than message length, dont display fillText
    if (stripAnsi(msg).length >= windowSize.width) {
      print(msg);
      return msg;
    } else {
      let left = parseInt((windowSize.width - stripAnsi(msg).length) / 2, 10);
      let padStr = repeating(left / stripAnsi(fillText).length, fillText);
      let output = padStr + msg + padStr;
      print(output);
      return output;
    }
  }
}

// export all methods so they call be used statically
exports.critical = new Messenger().critical;
exports.error = new Messenger().error;
exports.success = new Messenger().success;
exports.warning = new Messenger().warning;
exports.important = new Messenger().important;
exports.info = new Messenger().info;
exports.notice = new Messenger().notice;
exports.status = new Messenger().status;
exports.debug = new Messenger().debug;
exports.log = new Messenger().log;
exports.dd = new Messenger().dd;
exports.dump = new Messenger().dump;
exports.terminalInfo = new Messenger().terminalInfo;
exports.center = new Messenger().center;
exports.line = new Messenger().line;

module.exports = new Messenger();
