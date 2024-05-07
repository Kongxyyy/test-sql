const express = require('express');
const app = express();
const sql = require("mssql");

var config = {
    user: 'admin1',
    password: 'adminadmin1',
    server: 'PBGM7E',
    database: 'db_Gauge_Inventory',
    options: {
        trustServerCertificate: true
    }
};

app.get('/', function (req, res) {

    sql.connect(config, function (err) {
        if (err) {
            console.log("Error connecting to database:", err);
            res.status(500).send("Error connecting to database");
            return;
        }

        var request = new sql.Request();

        request.query('select Emp_Name from [master].[tb_Employee]', function (err, recordset) {
            if (err) {
                console.log("Error executing query:", err);
                res.status(500).send("Error executing query");
                return;
            }

            res.send(recordset);
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
