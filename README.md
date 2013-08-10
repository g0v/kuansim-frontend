# Kuansim-frontend

[![Build Status](https://travis-ci.org/g0v/kuansim.png?branch=master)](https://travis-ci.org/g0v/kuansim)

- [How to join](https://g0v.hackpad.com/--1OaXIxVVPSd)

# Branch Rules
See [git-flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)

*   All new code shall be push to `develop` branch
*   Release manager will merge `develop` to `master`
 
# Import fake data

check out fake data

```
$ make checkout
```

import to pgrest.

```
$ make import
```

# Start the server
```
$ npm i
$ ./script/server.sh
```

# See also

- Project site: http://hack.g0v.tw/kuansim
- Bug report or feedback here
