const db = require("../models");
const User = db.user;

exports.get = (req, res) => {
    let eid = req.query.eid;
    User.find({
            empId: eid
        })
        .then(data => {
            console.log(data)
            if (data.length != 0) {
                datas = data
                datas["id"] = data[0]._id
                datas["empId"] = data[0].empId,
                    datas["firstName"] = data[0].firstName
                datas["lastName"] = data[0].lastName
                datas["department"] = data[0].department
                datas["position"] = data[0].position
                datas["payRate"] = data[0].payRate
                datas["email"] = data[0].email
                datas["phone"] = data[0].phone
                console.log(data[0].empId)
                res.send(datas)
            } else {
                datas = {}
                console.log("here")
                datas["id"] = ""
                datas["empId"] = eid,
                    datas["firstName"] = ""
                datas["lastName"] = ""
                datas["department"] = ""
                datas["position"] = ""
                datas["payRate"] = 0
                datas["email"] = ""
                datas["phone"] = 0
                res.send(datas)
            }
            console.log("here")

            // console.log(datas.payrate)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        });
}

exports.Upsert = (req, res) => {
    User.findOneAndUpdate({
        empId: req.body.empId
    }, {
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        position: req.body.position,
        payRate: req.body.payRate,
        email: req.body.email,
        phone: req.body.phone
    }, {
        returnOriginal: false,
        upsert: true,
    }).then(data => {
        console.log("heeeeeeeeeee" + data)
        console.log("sucessfully upserted")
        res.status(200)
        res.send()
    }).catch(err => {
        console.log(err)
    });
}

exports.EmailID = (req, res) => {
    let inemail = req.query.email;
    User.find({
            email: inemail
        })
        .then(data => {
            console.log(data)
            if (data.length != 0) {
                datas = {}
                // datas["id"]=data[0]._id
                datas["empId"] = data[0].empId,
                    // datas["firstName"]=data[0].firstName
                    // datas["lastName"]=data[0].lastName
                    // datas["department"]=data[0].department
                    // datas["position"]=data[0].position
                    // datas["payRate"]=data[0].payRate
                    // datas["email"]=data[0].email
                    // datas["phone"]=data[0].phone
                    console.log(data[0].empId)
                res.send(datas)
            } else {
                datas = {}
                console.log("not found here")
                // datas["id"]=""
                datas["empId"] = (-1),
                    // datas["firstName"]=""
                    // datas["lastName"]=""
                    // datas["department"]=""
                    // datas["position"]=""
                    // datas["payRate"]=0
                    // datas["email"]=""
                    // datas["phone"]=0
                    res.send(datas)
            }
            console.log("here")

            // console.log(datas.payrate)
        })
        .catch(err => {
            console.log(err)
            res.status(500)
        });
}