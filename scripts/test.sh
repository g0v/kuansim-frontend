#!/bin/bash

(cd `dirname $0`/.. && node_modules/.bin/karma start --single-run --browsers PhantomJS)
