#!/usr/bin/env lsc -c
author: 'Chia-liang Kao'
name: 'angular-brunch-seed-livescript'
description: 'AngularJS + Brunch + LiveScript'
version: '0.1.1'
homepage: 'https://github.com/clkao/angular-brunch-seed-livescript'
repository:
  type: 'git'
  url: 'https://github.com/clkao/angular-brunch-seed-livescript'
engines:
  node: '0.8.x'
  npm: '1.1.x'
scripts:
  prepublish: './node_modules/.bin/lsc -c package.json.ls'
  start: 'scripts/server.sh'
  test: 'scripts/test.sh'
dependencies: {}
devDependencies:
  karma: \>=0.11.13
  'karma-live-preprocessor': \>=0.2.2
  \karma-mocha : \~0.1.0
  LiveScript: \>=1.2.0
  brunch: '1.5.x'
  'javascript-brunch': '1.5.x'
  'LiveScript-brunch': '1.5.x'
  'css-brunch': '1.5.x'
  'sass-brunch': '1.5.x'
  'jade-brunch': '1.4.x'
  'static-jade-brunch': '>= 1.4.0 <= 1.4.5 || >= 1.4.8 < 1.5'
  'auto-reload-brunch': '1.5.x'
  'uglify-js-brunch': '1.3.x'
  'clean-css-brunch': '1.5.x'
