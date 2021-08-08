/// <reference types="cypress" />
const path = require('path')
const { startDevServer } = require('@cypress/webpack-dev-server')

function injectStylesInlineForPercyInPlace (webpackConfig) {
  webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
    if (rule?.use[0]?.loader.includes('mini-css-extract-plugin')) {
      return {
        ...rule,
        use: [{
          loader: 'style-loader',
        }],
      }
    }

    return rule
  })
}

module.exports = {
  testFiles: '**/*spec.{ts,tsx}',
  video: true,
  env: {
    reactDevtools: true,
  },
  component: {
    setupDevServer (options) {
      const { default: webpackConfig } = require(path.resolve(__dirname, 'webpack.config.ts'))

      injectStylesInlineForPercyInPlace(webpackConfig)

      return startDevServer({
        webpackConfig,
        options,
      })
    },
  },
}
