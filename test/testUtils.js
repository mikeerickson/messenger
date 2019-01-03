process.env.NODE_ENV = "test";

const MAIN_LINE = "⏤";
const MAIN_ICON = "🚧";
const DESCRIBE_ICON = "✏️";
const TEST_ICON = "📝";

module.exports = {
  icons: {
    MAIN_LINE,
    MAIN_ICON,
    DESCRIBE_ICON,
    TEST_ICON
  },
  classLabel: (str, icon = MAIN_ICON) => {
    let main = " " + str + "  " + repeat(terminal.width - str.length - 10, MAIN_LINE);
    return `\n${icon}  ` + colors.magenta.bold(`${main}`);
  },
  commandLabel: (str, icon = TEST_ICON) => {
    return colors.cyan.bold(`\n ${icon}  ${str}\n`);
  },
  raw: str => {
    return JSON.stringify(str);
  },
  colors: require("chalk"),
  repeat: (str, num) => {
    let repeating = require("repeating");
    // reverse parameters to be consinstent with other repeating libraries
    return repeating(num, str);
  },
  terminal: require("window-size"),
  stripAnsi: require("strip-ansi")
};
