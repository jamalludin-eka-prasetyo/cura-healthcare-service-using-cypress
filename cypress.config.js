const { defineConfig } = require('cypress')
fs = require('fs');
Papa = require('papaparse');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://katalon-demo-cura.herokuapp.com/',
    viewportWidth: 1920, 
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      // config get data csv for login
      const csvFile = fs.readFileSync('cypress/fixtures/Login_data.csv', 'utf8'); 
      const users = Papa.parse(csvFile, { header: true, skipEmptyLines: true }).data; 
      config.env.users = users;

      // configt get data csv for make appointment
      const appointmentFile = fs.readFileSync('cypress/fixtures/Appointment_data.csv', 'utf8'); 
      const appointments = Papa.parse(appointmentFile, { header: true, skipEmptyLines: true }).data; 
      config.env.appointments = appointments; 
      
      return config;
    },
    reporter: "mochawesome",
    reporterOptions: { 
      reportDir: "cypress/reports", 
      overwrite: false, 
      html: true, 
      json: true
    }
  },
})
