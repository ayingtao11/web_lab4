var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const database_sourse = "db.sqlite"

let db = new sqlite3.Database(database_source, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`SELECT * FROM TABLE all_car_info
            )`
        );  
    }
});

module.exports = db