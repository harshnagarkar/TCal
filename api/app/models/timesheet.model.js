module.exports = mongoose => {
    const Timesheet = mongoose.model(
      "timesheet",
      mongoose.Schema(
        {
          EmpName: String,
          Emp_ID: String,
          Month: String,
          TimeIn: String,
          TimeOut: String,
          NumHours: String,
          Identifier: String
        },
        { timestamps: true }
      )
    );
  
    return Timesheet;
  };