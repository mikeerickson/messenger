const each = require("jest-each");
const print = require("../src/messenger");
let { commandLabel, classLabel, repeat, raw, stripAnsi } = require("./test-utils");

const icons = print.icons;

describe(classLabel("Messenger Class"), () => {
  describe(commandLabel("Critical"), () => {
    let criticalMessage = "Critical Message";
    let args = [
      [criticalMessage, "", false, criticalMessage],
      [criticalMessage, "label", false, "label"],
      [criticalMessage, "CRITICAL", false, "CRITICAL"],
      [criticalMessage, "", true, icons.critical]
    ];
    test.each(args)(".critical(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.critical(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Error"), () => {
    let errorMessage = "Error Message";
    let args = [
      [errorMessage, "", false, errorMessage],
      [errorMessage, "label", false, "label"],
      [errorMessage, "ERROR", false, "ERROR"],
      [errorMessage, "", true, icons.error]
    ];
    test.each(args)(".error(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.error(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Success"), () => {
    let successMessage = "Success Message";
    let args = [
      [successMessage, "", false, successMessage],
      [successMessage, "label", false, "label"],
      [successMessage, "SUCCESS", false, "SUCCESS"],
      [successMessage, "", true, icons.success]
    ];
    test.each(args)(".success(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.success(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Warning"), () => {
    let warningMessage = "warningMessage Message";
    let args = [
      [warningMessage, "", false, warningMessage],
      [warningMessage, "label", false, "label"],
      [warningMessage, "WARNING", false, "WARNING"],
      [warningMessage, "", true, icons.warning]
    ];
    test.each(args)(".warning(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.warning(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Warn"), () => {
    let warnMessage = "Warn Message";
    let args = [
      [warnMessage, "", false, warnMessage],
      [warnMessage, "label", false, "label"],
      [warnMessage, "WARN", false, "WARN"],
      [warnMessage, "", true, icons.warn]
    ];
    test.each(args)(".warn(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.warn(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Important"), () => {
    let importantMessage = "Important Message";
    let args = [
      [importantMessage, "", false, importantMessage],
      [importantMessage, "label", false, "label"],
      [importantMessage, "IMPORTANT", false, "IMPORTANT"],
      [importantMessage, "", true, icons.important]
    ];
    test.each(args)(".important(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.important(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Info"), () => {
    let infoMessage = "Info Message";
    let args = [
      [infoMessage, "", false, infoMessage],
      [infoMessage, "label", false, "label"],
      [infoMessage, "INFO", false, "INFO"],
      [infoMessage, "", true, icons.info]
    ];
    test.each(args)(".info(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.info(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Note"), () => {
    let noteMessage = "Note Message";
    let args = [
      [noteMessage, "", false, noteMessage],
      [noteMessage, "label", false, "label"],
      [noteMessage, "NOTE", false, "NOTE"],
      [noteMessage, "", true, icons.note]
    ];
    test.each(args)(".note(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.note(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Notice"), () => {
    let noticeMessage = "Notice Message";
    let args = [
      [noticeMessage, "", false, noticeMessage],
      [noticeMessage, "label", false, "label"],
      [noticeMessage, "NOTICE", false, "NOTICE"],
      [noticeMessage, "", true, icons.notice]
    ];
    test.each(args)(".notice(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.notice(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Log"), () => {
    let logMessage = "Log Message";
    let args = [
      [logMessage, "", false, logMessage],
      [logMessage, "label", false, "label"],
      [logMessage, "LOG", false, "LOG"],
      [logMessage, "", true, icons.log]
    ];
    test.each(args)(".log(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.log(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
  describe(commandLabel("Debug"), () => {
    let debugMessage = "Debug Message";
    let args = [
      [debugMessage, "", false, debugMessage],
      [debugMessage, "label", false, "label"],
      [debugMessage, "DEBUG", false, "DEBUG"],
      [debugMessage, "", true, icons.debug]
    ];
    test.each(args)(".debug(%p, %p, %s)", (msg, label, icon, expected) => {
      let result = print.debug(msg, label, icon);
      expect(stripAnsi(result)).toContain(expected);
    });
  });
});
