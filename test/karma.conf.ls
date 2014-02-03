module.exports = (config) ->
  config.set do

    basePath: \./

    preprocessors:
      * \**/*.ls : [ \live ]

    frameworks:
      * \mocha
        ...

    plugins:
      * \karma-live-preprocessor
      * \karma-mocha
      * \karma-phantomjs-launcher

    files:
      * \unit/app/*.ls
        ...

    exclude:
        ...

    reporters:
      * \progress
        ...

    port: 9876

    colors: true

    logLevel: config.LOG_INFO

    browsers:
      * \Chrome
        ...

    captureTimeout: 60000

    singleRun: false
