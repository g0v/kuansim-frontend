#!/bin/bash

(cd `dirname $0`/.. && node_modules/karma/bin/karma start --single-run --browsers PhantomJS test/karma.conf.ls)
