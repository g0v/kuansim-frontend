#!/bin/bash

(cd `dirname $0`/.. && rm -rf _public && node_modules/brunch/bin/brunch watch --server)
