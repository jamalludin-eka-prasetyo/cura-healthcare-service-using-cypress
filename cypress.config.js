const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://katalon-demo-cura.herokuapp.com/',
    viewportWidth: 1920, 
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
    },
  },
})
