const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fullstack"
});

const bcrypt = require('bcrypt');


exports.getProducts = function() {
    return new Promise(async function(resolve, reject) {
        con.query("SELECT * FROM product", function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.getOrders = function() {
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT id,customer_id,cart_id,total,city,street,DATE_FORMAT(ship_date,'%Y-%m-%d') AS shipping_date,DATE_FORMAT(order_date,'%Y-%m-%d') AS order_date 
                    FROM orders`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}


exports.CheckLogIn = function(userid, pass) {

    return new Promise(async function(resolve, reject) {
        con.query(`SELECT * FROM customer WHERE mail='${userid}'`, function(err, result, field) {
            if (err) throw reject(err);
            let res = result;

            if (res.length == 0) { // customer does'nt exist
                res = false;
                resolve(res);
            } else if (res[0].password == pass) { // customer and password exsits
                resolve(res);
            } else { // password doesn't mach
                res = true;
                resolve(res);
            }
        });
    });
}

exports.CheckLogIn = function(userid, pass) {
    console.log('userid', userid);
    return new Promise(function(resolve, reject) {
        con.query(`SELECT * FROM customer WHERE mail='${userid}'`, async function(err, result, field) {
            if (err) throw reject(err);
            let res = result;
            let compare_pass;
            console.log('res', res);
            if (res.length == 0) { // customer does'nt exist
                res = false;
                resolve(res);
            }

            bcrypt.compare(pass, res[0].password, async function(err1, res1) {
                console.log('inside', res1);
                compare_pass = res1;
                console.log('comp', compare_pass);
                if (compare_pass == true) { // customer and password exsits
                    resolve(res);
                } else { // password doesn't mach
                    res = true;
                    resolve(res);
                }
            });
        });
    });
}


exports.addCustomer = function(id, email, password, city, street, first_name, last_name) {
    return new Promise(function(resolve, reject) {
        con.query(`INSERT INTO customer (customer_id,mail,password,city,street,first_name,last_name) VALUES ('${id}','${email}','${password}','${city}','${street}','${first_name}','${last_name}')`, async function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.CheckCustomerID = (CustomerID) => {
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT * FROM customer WHERE customer_id=${CustomerID}`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.CheckPassExists = (PassExists) => {
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT * FROM customer WHERE password=${PassExists}`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.GetCart = (CustomerID) => {
    return new Promise(async(resolve, reject) => {
        con.query(`SELECT cart_id,customer_id,DATE_FORMAT(cart_date,'%Y-%m-%d') AS cart_date,status FROM cart WHERE customer_id=${CustomerID}`, (err, result, field) => {
            console.log(result);
            var no_products = 1;
            var status;
            result.forEach((item, index) => {
                console.log('index', index);
                console.log('item', item);

                status = item['status'];

                if (status === 0) {
                    var open_cart = [];
                    open_cart.push(item);
                    console.log(open_cart);
                    con.query(`SELECT * FROM product_in_cart `, (error, res, field0) => {
                        console.log('result', res);
                        res.forEach((id, index) => {
                            if (id != item['cart_id']) {
                                no_products = 0;
                            }
                        });
                        console.log('products', no_products);
                        if (no_products == 1) {

                            con.query(` SELECT cart.cart_id,cart.customer_id,DATE_FORMAT(cart.cart_date,'%Y-%m-%d') AS cart_date,cart.status,customer.first_name,customer.last_name,SUM(product_in_cart.total_price) as total_p
                                    FROM cart JOIN product_in_cart 
                                    ON product_in_cart.cart_id = cart.cart_id 
                                    LEFT JOIN customer 
                                    ON customer.customer_id = cart.customer_id 
                                    WHERE customer.customer_id=${CustomerID}`, (err1, result1, field1) => {
                                if (err1) throw reject(err1);
                                resolve(result1);
                            });
                        } else {
                            console.log('prod', open_cart);
                            resolve(open_cart);
                        }
                    });

                }
                if (err) throw reject(err);
            });

            if (status !== 0) {
                con.query(` SELECT orders.id,orders.customer_id,orders.cart_id,orders.total,orders.city,orders.street,
                            DATE_FORMAT(orders.ship_date,'%Y-%m-%d') AS shipping_date,DATE_FORMAT(orders.order_date,'%Y-%m-%d') AS order_date,orders.credit_card ,cart.status 
                            FROM orders JOIN cart ON cart.cart_id = orders.cart_id WHERE orders.customer_id=${CustomerID} 
                            ORDER BY orders.cart_id DESC LIMIT 1`, (err2, result2, field2) => {
                    if (err2) throw reject(err2);
                    resolve(result2);
                });
            }
        });
    });
}



exports.OpenNewCart = function(id) {
    return new Promise(function(resolve, reject) {
        con.query(`INSERT INTO cart (customer_id) VALUES ('${id}')`, function(err, result, field) {
            con.query(`SELECT * FROM cart WHERE customer_id=${id} AND status=0`, function(err1, result1, field1) {
                if (err1) throw reject(err1);
                resolve(result1);
            });
        });
    });
}