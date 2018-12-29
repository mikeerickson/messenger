const path = require("path");
const fs = require("fs-extra");
const pkgInfo = require("../package.json");

const {
  critical,
  error,
  success,
  warning,
  warn,
  important,
  info,
  notice,
  note,
  status,
  debug,
  log,
  center,
  line,
  terminalInfo
} = require("../src/messenger");

let { commandLabel, classLabel, repeat, raw } = require("./test-utils");

const print = require("../src/messenger");

// enable logger
print.initLogger(true, "logs", "test");

describe(classLabel("Messenger Class"), () => {
  let m, message;
  beforeEach(() => {
    m = print;
    message = "Messenger Test";
  });
  describe(commandLabel("Miscellaneous"), () => {
    test("version returns `pkgInfo.version` property", done => {
      expect(print.version()).toEqual(pkgInfo.version);
      done();
    });
  });
  describe(commandLabel("Critical"), () => {
    test("critical static", () => {
      expect(typeof critical).toBe("function");
      critical(message);
    });
    test("critical class method", () => {
      expect(typeof print.critical).toBe("function");
      print.critical(message);
    });
    test("should return critical messasge", () => {
      let output = print.critical(message);
      expect(output)
        .toContain(message)
        .toContain("Messenger")
        .toContain("Test");
    });
    test("critical method should return colored output", () => {
      let output = print.critical(message);
      expect(raw(output)).toContain("u001b");
    });
    test("critical method should return label", () => {
      let output = print.critical(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("u001b[30m TEST");
    });
    test("critical method should include icon", () => {
      let output = print.critical(message, "", true);
      expect(output).toContain(m.icons.critical);
    });
  });
  describe(commandLabel("Error"), () => {
    test("error static", () => {
      expect(typeof error).toBe("function");
      error(message);
    });
    test("error class method", () => {
      expect(typeof m.error).toBe("function");
    });
    test("should return error messasge", () => {
      let output = print.error(message);
      expect(output).toContain(message);
    });
    test("error method should return colored output", () => {
      let output = print.error(message);
      expect(raw(output)).toContain("31m");
    });
    test("error method should return label", () => {
      let output = print.error(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("u001b[30m TEST");
    });
    test("error method should include icon", () => {
      let output = print.error(message, "", true);
      expect(output).toContain(m.icons.error);
    });
  });
  describe(commandLabel("Success"), () => {
    test("success static", () => {
      expect(typeof success).toBe("function");
      success(message);
    });
    test("success class method", () => {
      expect(typeof m.success).toBe("function");
    });
    test("should return success messasge", () => {
      let output = print.success(message);
      expect(output).toContain(message);
    });
    test("success method should return colored output", () => {
      let output = print.success(message);
      expect(raw(output)).toContain("32m");
    });
    test("success method should return label", () => {
      let output = print.success(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("u001b[30m TEST");
    });
    test("success method should include icon", () => {
      let output = print.success(message, "", true);
      expect(output).toContain(m.icons.success);
    });
  });
  describe(commandLabel("Warning"), () => {
    test("warning static", () => {
      expect(typeof warning).toBe("function");
      warning(message);
    });
    test("warning class method", () => {
      expect(typeof m.warning).toBe("function");
    });
    test("should return warning messasge", () => {
      let output = print.warning(message);
      expect(output).toContain(message);
    });
    test("warning method should return colored output", () => {
      let output = print.warning(message);
      expect(raw(output)).toContain("[33m");
    });
    test("warning method should return label", () => {
      let output = print.warning(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[33m");
    });
    test("warning method should include icon", () => {
      let output = print.warning(message, "", true);
      expect(output).toContain(m.icons.warning);
    });
  });
  describe(commandLabel("Warn"), () => {
    test("warn static", () => {
      expect(typeof warn).toBe("function");
      warn(message);
    });
    test("warn class method", () => {
      expect(typeof m.warn).toBe("function");
    });
    test("should return warn messasge", () => {
      let output = print.warn(message);
      expect(output).toContain(message);
    });
    test("warn method should return colored output", () => {
      let output = print.warn(message);
      expect(raw(output)).toContain("[33m");
    });
    test("warn method should return label", () => {
      let output = print.warn(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[33m");
    });
    test("warn method should include icon", () => {
      let output = print.warn(message, "", true);
      expect(output).toContain(m.icons.warn);
    });
  });
  describe(commandLabel("Info"), () => {
    test("info static", () => {
      expect(typeof info).toBe("function");
      info(message);
    });
    test("info class method", () => {
      expect(typeof m.info).toBe("function");
    });
    test("should return info messasge", () => {
      let output = print.info(message);
      expect(output).toContain(message);
    });
    test("info method should return colored output", () => {
      let output = print.info(message);
      expect(raw(output)).toContain("[36m");
    });
    test("info method should return label", () => {
      let output = print.info(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[30m");
    });
    test("info method should include icon", () => {
      let output = print.info(message, "", true);
      expect(output).toContain(m.icons.info);
    });
  });
  describe(commandLabel("Important"), () => {
    test("important static", () => {
      expect(typeof important).toBe("function");
      important(message);
    });
    test("important class method", () => {
      expect(typeof m.important).toBe("function");
    });
    test("should return important messasge", () => {
      let output = print.important(message);
      expect(output).toContain(message);
    });
    test("important method should return colored output", () => {
      let output = print.important(message);
      expect(raw(output)).toContain("[39m");
    });
    test("important method should return label", () => {
      let output = print.important(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[30m");
    });
    test("important method should include icon", () => {
      let output = print.important(message, "", true);
      expect(output).toContain(m.icons.important);
    });
  });
  describe(commandLabel("Status"), () => {
    test("status static", () => {
      expect(typeof status).toBe("function");
      status(message);
    });
    test("status class method", () => {
      expect(typeof m.status).toBe("function");
    });
    test("should return status messasge", () => {
      let output = print.status(message);
      expect(output).toContain(message);
    });
    test("status method should return colored output", () => {
      let output = print.status(message);
      expect(raw(output)).toContain("[39m");
    });
    test("status method should return label", () => {
      let output = print.status(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[30m");
    });
    test("status method should include icon", () => {
      let output = print.status(message, "", true);
      expect(output).toContain(m.icons.status);
    });
  });
  describe(commandLabel("Note"), () => {
    test("note static", () => {
      expect(typeof note).toBe("function");
      note(message);
    });
    test("note class method", () => {
      expect(typeof m.note).toBe("function");
    });
    test("should return note messasge", () => {
      let output = print.note(message);
      expect(output).toContain(message);
    });
    test("note method should return colored output", () => {
      let output = print.note(message);
      expect(raw(output)).toContain("u001b");
    });
    test("note method should return label", () => {
      let output = print.note(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[30m");
    });
    test("note method should include icon", () => {
      let output = print.note(message, "", true);
      expect(output).toContain(m.icons.note);
    });
  });
  describe(commandLabel("Notice"), () => {
    test("notice static", () => {
      expect(typeof notice).toBe("function");
      notice(message);
    });
    test("notice class method", () => {
      expect(typeof m.notice).toBe("function");
    });
    test("should return notice messasge", () => {
      let output = print.notice(message);
      expect(output).toContain(message);
    });
    test("notice method should return colored output", () => {
      let output = print.notice(message);
      expect(raw(output)).toContain("u001b");
    });
    test("notice method should return label", () => {
      let output = print.notice(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[30m");
    });
    test("notice method should include icon", () => {
      let output = print.notice(message, "", true);
      expect(output).toContain(m.icons.notice);
    });
  });
  describe(commandLabel("Log"), () => {
    test("log static", () => {
      expect(typeof log).toBe("function");
      log(message);
    });
    test("log class method", () => {
      expect(typeof m.log).toBe("function");
    });
    test("should return log messasge", () => {
      let output = print.log(message);
      expect(output).toContain(message);
    });
    test("log method should return colored output", () => {
      let output = print.log(message);
      expect(raw(output)).toContain("[39m");
    });
    test("log method should return label", () => {
      let output = print.log(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[37m");
    });
    test("log method should include icon", () => {
      let output = print.log(message, "", true);
      expect(output).toContain(m.icons.log);
    });
  });
  describe(commandLabel("Debug"), () => {
    test("debug static", () => {
      expect(typeof debug).toBe("function");
      debug(message);
    });
    test("debug class method", () => {
      expect(typeof m.debug).toBe("function");
    });
    test("should return debug messasge", () => {
      let output = print.debug(message);
      expect(output).toContain(message);
    });
    test("debug method should return colored output", () => {
      let output = print.debug(message);
      expect(raw(output)).toContain("[90m");
    });
    test("debug method should return label", () => {
      let output = print.debug(message, "TEST");
      expect(output).toContain("TEST");
      expect(raw(output)).toContain("[90m");
    });
    test("debug method should include icon", () => {
      let output = print.debug(message, "", true);
      expect(output).toContain(m.icons.debug);
    });
  });
  describe(commandLabel("Center"), () => {
    test("center static", () => {
      expect(typeof center).toBe("function");
      center(message);
    });
    test("center class method", () => {
      expect(typeof m.center).toBe("function");
    });
    test("should return center messasge", () => {
      let output = print.center(message);
      expect(output).toContain(message);
    });
    test("should suppress lines", () => {
      let longMessage = repeat(terminalInfo().width + 10, "=");
      let output = print.center(longMessage, "*");
      expect(output).not.toContain("*");
    });
  });
  describe(commandLabel("Line"), () => {
    test("line static", () => {
      expect(typeof line).toBe("function");
      line(message);
    });
    test("line class method", () => {
      expect(typeof m.line).toBe("function");
    });
    test("should return line messasge", () => {
      let output = print.line(message);
      expect(output).toContain(message);
    });
  });
  describe(commandLabel("Logger"), () => {
    test("logger directory exists", done => {
      let result = fs.existsSync(path.dirname(print.logger.file));
      expect(result).toBe(true);
      done();
    });
  });
});
