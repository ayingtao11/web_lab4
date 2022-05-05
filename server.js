// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

//API endpoints
app.get("/api/car_owners", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_owners/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Email){
        errors.push("No Email specified");
    }
    if (!req.body.Name){
        errors.push("No Name specified");
    }
    if (!req.body.Year){
        errors.push("No Year specified");
    }
    if (!req.body.Make){
        errors.push("No Make specified");
    }
    if (!req.body.Model){
        errors.push("No Model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO car_owners (Car_ID,Email,Name,Year,Make,Model) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_owners/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car_owners set 
            Car_ID = COALESCE(?,Car_ID), 
            Email = COALESCE(?,Email), 
            Name = COALESCE(?,Name), 
            Year = COALESCE(?,Year), 
            Make = COALESCE(?,Make), 
            Model = COALESCE(?,Model), 
            WHERE id = ?`,
        [data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints
app.get("/api/car_judges", (req, res, next) => {
    var sql = "select * from car_judges"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_judges/:id", (req, res, next) => {
    var sql = "select * from car_judges where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_judges/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Judge_ID){
        errors.push("No Judge_ID specified");
    }
    if (!req.body.Judge_Name){
        errors.push("No Judge_Name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Judge_ID: req.body.Judge_ID,
        Judge_Name: req.body.Judge_Name,
    }
    var sql ='INSERT INTO car_judges (Car_ID,Judge_ID,Judge_Name) VALUES (?,?,?)'
    var params =[data.Car_ID,data.Judge_ID,data.Judge_Name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_judges/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Judge_ID: req.body.Judge_ID,
        Name: req.body.Judge_Name,
    }
    db.run(
        `UPDATE car_judges set 
            Car_ID = COALESCE(?,Car_ID), 
            Judge_ID = COALESCE(?,Judge_ID), 
            Name = COALESCE(?,Judge_Name), 
            WHERE id = ?`,
        [data.Car_ID,data.Judge_ID,data.Judge_Name,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints
app.get("/api/car_body_frame", (req, res, next) => {
    var sql = "select * from car_body_frame"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_body_frame/:id", (req, res, next) => {
    var sql = "select * from car_body_frame where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_body_frame/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Body_Frame_Undercarriage){
        errors.push("No Body_Frame_Undercarriage specified");
    }
    if (!req.body.Body_Frame_Suspension){
        errors.push("No Body_Frame_Suspension specified");
    }
    if (!req.body.Body_Frame_Chrome){
        errors.push("No Body_Frame_Chrome specified");
    }
    if (!req.body.Body_Frame_Detailing){
        errors.push("No Body_Frame_Detailing specified");
    }
    if (!req.body.Body_Frame_Cleanliness){
        errors.push("No Body_Frame_Cleanliness specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Body_Frame_Undercarriage: req.body.Body_Frame_Undercarriage,
        Body_Frame_Suspension: req.body.Body_Frame_Suspension,
        Body_Frame_Chrome: req.body.Body_Frame_Chrome,
        Body_Frame_Detailing: req.body.Body_Frame_Detailing,
        Body_Frame_Cleanliness: req.body.Body_Frame_Cleanliness
    }
    var sql ='INSERT INTO car_body_frame (Car_ID,Body_Frame_Undercarriage,Body_Frame_Suspension,Body_Frame_Chrome,Body_Frame_Detailing,Body_Frame_Cleanliness) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Body_Frame_Undercarriage,data.Body_Frame_Suspension,
        data.Body_Frame_Chrome,data.Body_Frame_Detailing,data.Body_Frame_Cleanliness]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_body_frame/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Body_Frame_Undercarriage: req.body.Body_Frame_Undercarriage,
        Body_Frame_Suspension: req.body.Body_Frame_Suspension,
        Body_Frame_Chrome: req.body.Body_Frame_Chrome,
        Body_Frame_Detailing: req.body.Body_Frame_Detailing,
        Body_Frame_Cleanliness: req.body.Body_Frame_Cleanliness
    }
    db.run(
        `UPDATE car_body_frame set 
            Car_ID = COALESCE(?,Car_ID),
            Body_Frame_Undercarriage = COALESCE(?,Body_Frame_Undercarriage), 
            Body_Frame_Suspension = COALESCE(?,Body_Frame_Suspension), 
            Body_Frame_Chrome = COALESCE(?,Body_Frame_Chrome), 
            Body_Frame_Detailing = COALESCE(?,Body_Frame_Detailing), 
            Body_Frame_Cleanliness = COALESCE(?,Body_Frame_Cleanliness), 
            WHERE id = ?`,
        [data.Car_ID,data.Body_Frame_Undercarriage,data.Body_Frame_Suspension,
            data.Body_Frame_Chrome,data.Body_Frame_Detailing,data.Body_Frame_Cleanliness
            ,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})
//API endpoints
app.get("/api/car_owners", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_owners/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Email){
        errors.push("No Email specified");
    }
    if (!req.body.Name){
        errors.push("No Name specified");
    }
    if (!req.body.Year){
        errors.push("No Year specified");
    }
    if (!req.body.Make){
        errors.push("No Make specified");
    }
    if (!req.body.Model){
        errors.push("No Model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO car_owners (Car_ID,Email,Name,Year,Make,Model) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_owners/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car_owners set 
            Car_ID = COALESCE(?,Car_ID), 
            Email = COALESCE(?,Email), 
            Name = COALESCE(?,Name), 
            Year = COALESCE(?,Year), 
            Make = COALESCE(?,Make), 
            Model = COALESCE(?,Model), 
            WHERE id = ?`,
        [data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})
//API endpoints
app.get("/api/car_owners", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_owners/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Email){
        errors.push("No Email specified");
    }
    if (!req.body.Name){
        errors.push("No Name specified");
    }
    if (!req.body.Year){
        errors.push("No Year specified");
    }
    if (!req.body.Make){
        errors.push("No Make specified");
    }
    if (!req.body.Model){
        errors.push("No Model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO car_owners (Car_ID,Email,Name,Year,Make,Model) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_owners/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car_owners set 
            Car_ID = COALESCE(?,Car_ID), 
            Email = COALESCE(?,Email), 
            Name = COALESCE(?,Name), 
            Year = COALESCE(?,Year), 
            Make = COALESCE(?,Make), 
            Model = COALESCE(?,Model), 
            WHERE id = ?`,
        [data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})
//API endpoints
app.get("/api/car_owners", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/car_owners/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});

app.post("/api/car_owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Email){
        errors.push("No Email specified");
    }
    if (!req.body.Name){
        errors.push("No Name specified");
    }
    if (!req.body.Year){
        errors.push("No Year specified");
    }
    if (!req.body.Make){
        errors.push("No Make specified");
    }
    if (!req.body.Model){
        errors.push("No Model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO car_owners (Car_ID,Email,Name,Year,Make,Model) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/car_owners/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car_owners set 
            Car_ID = COALESCE(?,Car_ID), 
            Email = COALESCE(?,Email), 
            Name = COALESCE(?,Name), 
            Year = COALESCE(?,Year), 
            Make = COALESCE(?,Make), 
            Model = COALESCE(?,Model), 
            WHERE id = ?`,
        [data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});