module.exports = (config) ->
  config.set do

    basePath: \.

    frameworks:
      * \jasmine
        ...

    files:
      * \test/unit/app/*.js
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
