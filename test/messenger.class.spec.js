const forEach = require("mocha-each");
const expect = require("chai").expect;

const print = require("../src/messenger");
print.initLogger(true, "test", "test.log");
let { classLabel, commandLabel, testLabel, raw } = require("./testUtils");

const icons = print.icons;
const messageColor = print.messageColors;

const commandTest = command => {
  let message = `${command} message`;
  let tests = [
    [message, "", false, message],
    [message, command, false, command],
    [message, command.toUpperCase(), false, command.toUpperCase()],
    [message, "TEST_LABEL", false, messageColor[command].fg],
    [message, "TEST_LABEL", false, messageColor[command].bg],
    [message, "", true, icons[command]]
  ];

  forEach(tests).it(`.${command}(%s, %s, %s)`, (msg, label, icon, expected) => {
    let result = print[command](msg, label, icon);
    expect(raw(result)).contain(expected);
  });
};

describe(classLabel("Messenger Class"), () => {
  let commands = [
    "critical",
    "error",
    "success",
    "warning",
    "warn",
    "important",
    "info",
    "note",
    "notice",
    "log",
    "debug",
    "status"
  ];
  commands.forEach(command => {
    describe(commandLabel(`.${command}`), () => {
      commandTest(command);
    });
  });
});

describe(classLabel("Messenger Class Utilities"), () => {
  it("should confirm icons exists for each method", () => {
    let icons = print.getIcons();
    expect(icons.hasOwnProperty("error")).to.equal(true);
  });
  it("return information about terminal", () => {
    let terminal = print.terminalInfo();
    expect(terminal.hasOwnProperty("width")).to.equal(true);
  });
  it("properly formats message object", () => {
    let message = print.info({ fname: "Mike" });
    expect(message).contains("Mike");
  });
  it("properly formats message array", () => {
    let message = print.info(["mike", "erickson"]);
    expect(message).contain("mike erickson");
  });
  it("should test linux specific code", () => {
    let message = print.info(["mike", "erickson"]);
    expect(message).contain("mike erickson");
  });
});
