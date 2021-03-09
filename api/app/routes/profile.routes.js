module.exports = app => {
    const profile = require("../controllers/profile.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", profile.Upsert);
  
    // Retrieve all Books
    router.get("/", profile.get);
  
    app.use('/api/profile', router);
  };
  