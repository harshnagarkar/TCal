module.exports = mongoose => {
    const Timesheet = mongoose.model(
      "timesheet",
      mongoose.Schema(
        {
          EmpName: String, //actually holds user id from jwt token .sub field - AL 5/21/21
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