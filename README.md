# web_lab4
A description of your API endpoints

for all of the tables, include car_owners, car_judges, car_body_frame, car_engine, car_racer, and car_mods, I use
app.get("/api/table_name", (req, res, next) => {
to get all of the rows and fields from particular table from database.

I use
app.get("/api/car_owners/:id", (req, res, next) => {
to get a single row by Car_ID as id from particular table from database.

I use
app.post("/api/car_owners/", (req, res, next) => {
to insert new data from user input into the table.

I use
app.patch("/api/car_owners/:id", (req, res, next) => {
to update the new data using id for the table.

I use
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
and
res.json({
            "message":"get success",
            "data":row
        })
to make my table in JSON format.

In addition, I found this website is particularly useful:
https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
