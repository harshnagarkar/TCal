const db = require("../models");
const Timesheet = db.timesheets;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.Month) {
      res.status(400).send({ message: "You must include a date!" });
      return;
    }
  
    // Create a Timesheet
    const timesheet = new Timesheet({
      EmpName: req.body.EmpName,
      Emp_ID: req.body.Emp_ID,
      Month: req.body.Month,
      TimeIn: req.body.TimeIn,
      TimeOut: req.body.TimeOut,
      NumHours: req.body.NumHours,
    });
  
    // Save Timesheet in the database
    timesheet
      .save(timesheet)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating this timesheet."
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const EmpName = req.query.EmpName;
    var condition = EmpName ? { EmpName: { $regex: new RegExp(EmpName), $options: "i" } } : {};
  
    Timesheet.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving timesheets."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Timesheet.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No Timesheet found with the provided ID: " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Could not retrieve timesheet because an error occured. Timesheet ID:" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Update data cannot be left blank."
      });
    }
  
    const id = req.params.id;
  
    Timesheet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Unable to update timesheet with ID ${id}. It may be inaccessible or nonexistent.`
          });
        } else res.send({ message: "Timesheet updated!" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error, unable to update timesheet with ID " + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Timesheet.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete timesheet with ID ${id}. It may be inaccessible or nonexistent.`
          });
        } else {
          res.send({
            message: "Timesheet deleted!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Cannot delete timesheet with ID " + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Timesheet.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Timesheets were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error, unable to remove all timesheets."
        });
      });
  };
