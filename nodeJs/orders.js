const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fullstack"
});

exports.SubmitOrder = (customer_id, cart_id, total_price, city, street, shipping_date, order_date, credit) => {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE cart SET status=1`, async(err, result, field1) => {
            console.log(result)
            if (err)
                throw reject(err);
            else {
                con.query(` INSERT INTO orders (customer_id, cart_id, total, city,street,ship_date,credit_card) 
                    VALUES ('${customer_id}','${cart_id}','${total_price}','${city}','${street}','${shipping_date}','${credit}')`, async(err1, result1, field) => {
                    console.log('order saved')

                    if (err1) throw reject(err1);
                    else
                        result1 = true;

                    resolve(result1);
                });
            }
        });
    });
}