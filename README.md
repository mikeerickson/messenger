# @codedungeon/messenger

## Description

Messenger is a simple node module for display pretting console logs (with lots of formatting options) and support for logging messages to `.log` files (including daily rotation)

## Install

```bash
> npm install @codedungeon/messenger
```

## Usage

```js
const msg = require("@codedungeon/messenger");
const pkgInfo = require("./package.json");
msg.initLogger(true, "logs", pkgInfo.name);

console.log("");
let showIcons = false;
let showLabels = false;

msg.critical("critical message", showLabels ? "CRITICAL" : "", showIcons);
msg.error("error message", showLabels ? "ERROR" : "", showIcons);
msg.success("success message", showLabels ? "SUCCESS" : "", showIcons);
msg.warning("warning message", showLabels ? "WARNING" : "", showIcons);
msg.important("important message", showLabels ? "IMPORTANT" : "", showIcons);
msg.warn("warn message", showLabels ? "WARN" : "", showIcons);
msg.notice("notice message", showLabels ? "NOTICE" : "", showIcons);
msg.note("note message", showLabels ? "NOTE" : "", showIcons);
msg.status("status message", showLabels ? "STATUS" : "", showIcons);
msg.info("info message", showLabels ? "INFO" : "", showIcons);
msg.debug("debug message", showLabels ? "DEBUG" : "", showIcons);
```

### License

Copyright &copy; 2019 Mike Erickson
Released under the MIT license

### Credits

messenger written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.io](http://codedungeon.io)
