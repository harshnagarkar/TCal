module.exports = app => {
    const timesheets = require("../controllers/timesheet.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Timesheet
    router.post("/", timesheets.create);
  
    // Retrieve all Timesheets
    router.get("/", timesheets.findAll);
  
    // Retrieve a single Timesheet with id
    router.get("/:id", timesheets.findOne);
  
    // Update a Timesheet with id
    router.put("/:id", timesheets.update);
  
    // Delete a Timesheet with id
    router.delete("/:id", timesheets.delete);
  
    // Create a new Timesheet
    router.delete("/", timesheets.deleteAll);
  
    app.use('/api/timesheets', router);
  };