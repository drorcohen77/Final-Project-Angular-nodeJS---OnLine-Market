const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fullstack"
});


exports.GetCategorys = function() {
    return new Promise(async function(resolve, reject) {
        con.query(` SELECT * FROM category `, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.GetAllProducts = function() {
    return new Promise(async function(resolve, reject) {
        con.query(` SELECT product.*,category.category_name 
                    FROM product JOIN category 
                    ON product.category_id=category.category_id`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.GetCategoryprods = function(category_id) {
    return new Promise(async function(resolve, reject) {
        con.query(` SELECT * FROM product WHERE category_id=${category_id} `, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}

exports.searchProduct = function(product_name) {
    console.log("sql", product_name);
    return new Promise(async function(resolve, reject) {
        con.query(`SELECT * FROM product WHERE product_name LIKE '%${product_name}%'`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}


exports.GetProduct_In_Cart = function(cart_id) {
    return new Promise(async function(resolve, reject) {
        let products = await products_in_cart(cart_id);
        resolve(products);
    });
}


exports.AddToCart = (product_id, quantity, total_price, cart_id) => {
    return new Promise((resolve, reject) => {
        let res = false;
        let prod_quantity = 0;
        let prod_price = 0;

        con.query(` SELECT product_id,quantity,total_price FROM product_in_cart WHERE cart_id=${cart_id}`, async(err, result, field) => {
            if (err) throw reject(err);

            result.map((product) => {
                console.log(product)
                console.log(product.total_price)
                if (product_id == product.product_id) {
                    res = true;
                    prod_quantity = product.quantity;
                    prod_price = product.total_price;
                }
            });
            console.log('update', result.length, quantity, total_price)
            console.log('res', res)

            if (res) {
                let Quantity = quantity + prod_quantity;
                let TotalPrice = total_price + prod_price;
                console.log('Quantity', Quantity)
                con.query(` UPDATE product_in_cart SET quantity='${Quantity}',total_price='${TotalPrice}' 
                            WHERE product_id=${product_id} AND cart_id=${cart_id}`, async(err2, result2, field2) => {
                    if (err2) throw reject(err2);
                    console.log('Quantity', Quantity)
                    console.log('updateC')
                });
            } else {

                con.query(` INSERT INTO product_in_cart (product_id,quantity,total_price,cart_id) 
                            VALUES ('${product_id}','${quantity}','${total_price}','${cart_id}')`, async(err1, result1, field1) => {
                    if (err1) throw reject(err1);
                    console.log('insert')

                });
            }
            let products = await products_in_cart(cart_id);
            console.log('products', products)
            resolve(products);
        });


    });
}


exports.UpdateQuantity = function(id, quantity, total_price, cart_id) {
    return new Promise(async function(resolve, reject) {
        con.query(` UPDATE product_in_cart SET quantity='${quantity}',total_price='${total_price}' 
                    WHERE id=${id}`, async(err, result, field) => {
            if (err) throw reject(err);
        });

        let products = await products_in_cart(cart_id);
        resolve(products);
    });
}


exports.DeleteProduct_In_Cart = function(id, CartId) {
    return new Promise(function(resolve, reject) {
        con.query(`DELETE FROM product_in_cart WHERE id=${id}`, async function(err, result, field) {
            let products = await products_in_cart(CartId);
            resolve(products);
        });
    });
}

exports.DeleteAllProducts = function(cartId) {
    console.log('del', cartId)
    return new Promise(function(resolve, reject) {
        con.query(`DELETE FROM product_in_cart WHERE cart_id=${cartId}`, async function(err, result, field) {
            let products = await products_in_cart(cartId);
            console.log('products', products)
            resolve(products);
        });
    });
}

function products_in_cart(cart_id) {
    console.log('All', cart_id)
    return new Promise(async function(resolve, reject) {
        con.query(` SELECT product_in_cart.*, product.product_name, product.image   
                    FROM product_in_cart JOIN product
                    ON product_in_cart.product_id=product.product_id
                    WHERE product_in_cart.cart_id=${cart_id}`, function(err, result, field) {
            if (err) throw reject(err);
            resolve(result);
        });
    });
}