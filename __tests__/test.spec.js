const messenger = require("../src/messenger");

describe("Messenger Class", () => {
  test("critical test", () => {
    let result = messenger.critical("test");
    expect(result).toContain("test");
  });
});
