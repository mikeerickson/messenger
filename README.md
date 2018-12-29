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

msg.critical("hello world", showLabels ? "CRITICAL" : "", showIcons);
msg.error("hello world", showLabels ? "ERROR" : "", showIcons);
msg.success("hello world", showLabels ? "SUCCESS" : "", showIcons);
msg.warning("hello world", showLabels ? "WARNING" : "", showIcons);
msg.important("hello world", showLabels ? "IMPORTANT" : "", showIcons);
msg.warn("hello world", showLabels ? "WARN" : "", showIcons);
msg.notice("hello world", showLabels ? "NOTICE" : "", showIcons);
msg.status("hello world", showLabels ? "STATUS" : "", showIcons);
msg.info("hello world", showLabels ? "INFO" : "", showIcons);
msg.debug("hello world", showLabels ? "DEBUG" : "", showIcons);
```

### License

Copyright &copy; 2019 Mike Erickson
Released under the MIT license

### Credits

messenger written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.io](http://codedungeon.io)
