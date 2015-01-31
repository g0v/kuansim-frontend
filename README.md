# Kuansim-frontend
*   master [![Build Status](https://travis-ci.org/g0v/kuansim-frontend.png?branch=master)](https://travis-ci.org/g0v/kuansim-frontend)
*   develop [![Build Status](https://travis-ci.org/g0v/kuansim-frontend.png?branch=develop)](https://travis-ci.org/g0v/kuansim-frontend)
*   [![Dependency Status](https://gemnasium.com/g0v/kuansim-frontend.png)](https://gemnasium.com/g0v/kuansim-frontend)
*   [How to join](https://g0v.hackpad.com/--1OaXIxVVPSd)

# Branch Rules
See [git-flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)

*   All new code shall be push to `develop` branch
*   Release manager will merge `develop` to `master`

# Report Issue
Please report issue to <https://github.com/g0v/kuansim/issues>

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
$ ./scripts/server.sh
```

# See also
- [Brunch structure README](https://github.com/g0v/kuansim-frontend/blob/master/README_brunch.md)
- Project site: <http://hack.g0v.tw/kuansim>
- Bug report or feedback here
