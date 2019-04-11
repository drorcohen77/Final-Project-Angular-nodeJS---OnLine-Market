const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fullstack"
});



exports.AddProduct = (product_name, price, category_id, image) => {
    return new Promise(async(resolve, reject) => {
        con.query(` INSERT INTO product (product_name,price,category_id,image) 
                    VALUES ('${product_name}','${price}','${category_id}','${image}')`, async(err, result, field) => {
            if (err) throw reject(err);
        });

        let products = await AllProducts();
        console.log('products', products)
        resolve(products);
    });
}


exports.updateStudents = function(product_id, product_name, product_price, category_id, image) {
    return new Promise(async(resolve, reject) => {
        con.query(` UPDATE product SET image='${image}',product_name='${product_name}',price='${product_price}',category_id='${category_id}' 
                    WHERE product_id=${product_id}`, async(err, result, field) => {
            if (err) throw reject(err);
        });
        let products = await AllProducts();
        console.log('products', products)
        resolve(products);
    });
}

function AllProducts() {
    return new Promise(async(resolve, reject) => {
        con.query(` SELECT product.*,category.category_name 
                    FROM product JOIN category 
                    ON product.category_id=category.category_id`, (err, result, field) => {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}