const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fullstack"
});

const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.addCustomer = function(id, email, password, city, street, first_name, last_name) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            con.query(` INSERT INTO customer (customer_id,mail,password,city,street,first_name,last_name) 
                    VALUES ('${id}','${email}','${hash}','${city}','${street}','${first_name}','${last_name}')`, async function(err, result, field) {

                con.query(`SELECT * FROM customer WHERE customer_id=${id}`, async function(err1, result1, field1) {
                    if (err1) throw reject(err1);
                    resolve(result1);
                });
            });
        });
    });
}

exports.CheckCustomerID = (CustomerID) => {
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT mail FROM customer WHERE customer_id=${CustomerID}`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.CheckPassExists = (PassExists) => {
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT customer_id FROM customer WHERE password=${PassExists}`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}