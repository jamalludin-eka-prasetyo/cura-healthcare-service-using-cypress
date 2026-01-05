const { defineConfig } = require('cypress')
fs = require('fs');
Papa = require('papaparse');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://katalon-demo-cura.herokuapp.com/',
    viewportWidth: 1920, 
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      const csvFile = fs.readFileSync('cypress/fixtures/Login_data.csv', 'utf8'); 
      const users = Papa.parse(csvFile, { header: true, skipEmptyLines: true }).data; 
      config.env.users = users; return config;
    },
  },
})
