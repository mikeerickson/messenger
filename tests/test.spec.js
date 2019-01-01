const messenger = require("../src/messenger");
const expect = require("chai").expect;

// setting this will assure console logging is not sent to stdout
process.env.NODE_ENV = "test";

describe("Messenger Class", () => {
  it("critical test", () => {
    let result = messenger.critical("test");
    expect(result).contain("test");
  });
});
