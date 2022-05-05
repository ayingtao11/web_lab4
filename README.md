# web_lab4
A description of my API endpoints

All of my API enpoints are in server.js file.

for all of the tables, include car_owners, car_judges, car_body_frame, car_engine, car_racer, and car_mods, I use
`app.get("/api/table_name", (req, res, next) => {`
and 
`var sql = "select * from table_name"`
to get all of the rows and fields from particular table from database.

I use
`app.get("/api/table_name/:id", (req, res, next) => {`
and
`var sql = "select * from table_name where Car_ID = ?"
var params = [req.params.id]`
to get a single row by Car_ID as id from particular table from database.

I use
`app.post("/api/table_name/", (req, res, next) => {`
and
`var sql ='INSERT INTO table_name (Car_ID,Judge_ID,Judge_Name) VALUES (?,?,?)'
var params =[data.Car_ID,data.Judge_ID,data.Judge_Name]`
to insert new data from user input into the table.

I use
`app.patch("/api/table_name/:id", (req, res, next) => {`
and
`db.run(
        `UPDATE table_name set 
            Car_ID = COALESCE(?,Car_ID), 
            Judge_ID = COALESCE(?,Judge_ID), 
            Name = COALESCE(?,Judge_Name), 
            WHERE id = ?`,
        [data.Car_ID,data.Judge_ID,data.Judge_Name,req.params.id]`
to update the new data using Car_ID as id for the table.

I use
`var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());`
and
`res.json({
            "message":"get success",
            "data":row
        })`
to make my table in JSON format.

The lab requires nodejs, express, sqlite3, md5, npm, and ubuntu for windows in order to accomplish.
Users need to use the command:
`node server.js`
in order to start the server. I connect my server in port 8000, users need to open the brower and go to http://localhost:8000 to open the server site after used the node command.
If users want to check all rows of particular table, include car_owners, car_judges, car_body_frame, car_engine, car_racer, and car_mods, users can go to: http://localhost:8000/api/table_name
if users want to check a single row of table, go to: 
http://localhost:8000/api/table_name/Car_ID_number
for example: http://localhost:8000/api/car_judges/10


In addition, I found this website is particularly useful:
https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
