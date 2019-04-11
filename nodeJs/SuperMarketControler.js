const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require("fs");
const main = require('./main.js');
const registration = require('./registration');
const orders = require('./orders');
const shopping = require('./shopping');
const admin = require('./admin');

const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');


var sess = ''; //for req.session to be recognize with all app's

app.use(cookieParser());
app.use(session({
    secret: '1221312321423423423',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use(cors(corsOptions))

app.use(bodyParser.json());

// LOG-IN PAGE:

app.get('/getProducts', async(req, res) => {

    try {
        let numProducts = await main.getProducts();
        console.log(numProducts);
        res.send(numProducts);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


app.get('/getOrders', async(req, res) => {

    try {
        let numOrders = await main.getOrders();
        console.log(numOrders);
        res.send(numOrders);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


app.post(`/LogIn`, async(req, res) => {

    sess = req.session;

    let userid = req.body.userid;
    let pass = req.body.pass;
    let result;
    try {
        result = await main.CheckLogIn(userid, pass);
        console.log(result);
        if (result.length > 0) {
            sess.password = req.body.pass;
            console.log("cookie", sess);
            console.log("session", sess.password);
            res.send(result);
            res.end()
        } else {
            res.send(result);
            res.end()
        }
    } catch (err) {
        console.log("error is ", err);
    }
});

app.get('/logout', function(req, res) {
    let SessionDestroy = false

    sess.password = null
    SessionDestroy = true;
    console.log('Destroy', sess.password);
    res.send(SessionDestroy);
    res.end();
});

app.get('/GetCart/:id', async(req, res) => {
    let CustomerID = req.params.id;
    console.log("cart", CustomerID);
    try {
        let Cart = await main.GetCart(CustomerID);
        console.log("cart", Cart);
        res.send(Cart);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.post(`/OpenNewCart`, async(req, res) => {

    let ID = req.body.id;
    console.log(ID);
    try {
        result = await main.OpenNewCart(ID);
        console.log(result);
        res.send(result);
        res.end()
    } catch (err) {
        console.log("error is ", err);
    }
});


//REGISTRATION PAGE:


app.post(`/addCustomer`, async(req, res) => {
    sess = req.session;

    let reqid = req.body;
    let id = reqid.id;
    let email = reqid.email;
    let password = reqid.password;
    let city = reqid.city;
    let street = reqid.street;
    let first_name = reqid.firstName;
    let last_name = reqid.lastName;
    console.log(first_name);
    try {
        let result = await registration.addCustomer(id, email, password, city, street, first_name, last_name);
        console.log(result);
        sess.password = req.body.password;
        console.log("session", sess.password);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.get('/CheckCustomerID/:id', async(req, res) => {
    let CustomerID = req.params.id;
    console.log(CustomerID);
    try {
        let checkId = await registration.CheckCustomerID(CustomerID);
        console.log(checkId);
        let IDexist = false;
        if (checkId.length > 0)
            IDexist = true;

        console.log(IDexist);
        res.send(IDexist);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.get('/PassExists/:password', async(req, res) => {
    let PassExists = req.params.password;
    console.log(PassExists);
    try {
        let checkPass = await registration.CheckPassExists(PassExists);
        console.log(checkPass);
        let Passexist = false;
        if (checkPass.length > 0)
            Passexist = true;

        console.log(Passexist);
        res.send(Passexist);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


// SHOPPING PAGE:


app.get('/GetAllProducts', async(req, res) => {

    console.log('exist', sess.password);
    if (sess.password) {
        try {
            let AllProducts = await shopping.GetAllProducts();

            console.log(sess);
            console.log(AllProducts);
            res.send(AllProducts);
        } catch (err) {
            console.log("error is ", err);
        }
    } else {
        let resu = [];
        console.log("no session", sess);
        res.send(resu);
    }
    res.end();
});

app.get('/GetCategorys', async(req, res) => {

    console.log('caat', sess.password);
    try {
        let AllCategorys = await shopping.GetCategorys();
        console.log(AllCategorys);
        res.send(AllCategorys);

    } catch (err) {
        console.log("error is ", err);
    }
    res.end();
});

app.get('/Categoryprods/:id', async(req, res) => {

    let category_id = req.params.id;
    try {
        let AllCategoryProds = await shopping.GetCategoryprods(category_id);
        console.log(AllCategoryProds);
        res.send(AllCategoryProds);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.get('/searchProduct/:item', async(req, res) => {

    let item = JSON.parse(req.params.item);
    console.log(item);
    try {
        let Products = await shopping.searchProduct(item);
        console.log(Products);
        res.send(Products);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


app.get('/GetProduct_In_Cart/:cart_id', async(req, res) => {

    let cart_id = req.params.cart_id;
    console.log(cart_id);
    try {
        let Product_In_Cart = await shopping.GetProduct_In_Cart(cart_id);
        console.log(Product_In_Cart);
        res.send(Product_In_Cart);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.post(`/AddToCart`, async(req, res) => {

    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let cart_id = req.body.cartID;

    try {
        let result = await shopping.AddToCart(product_id, quantity, total_price, cart_id);
        console.log(result);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


app.put(`/UpdateQuantity`, async(req, res) => {

    let id = req.body.id;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let cart_id = req.body.cartID;

    try {
        let result = await shopping.UpdateQuantity(id, quantity, total_price, cart_id);
        console.log(result);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});

app.delete('/deleteProduct_In_Cart/:id/:CartId', async(req, res) => {
    let id = req.params.id;
    let CartId = req.params.CartId;

    try {
        let result = await shopping.DeleteProduct_In_Cart(id, CartId);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


app.delete('/DeleteAllProducts/:CartId', async(req, res) => {
    let CartId = req.params.CartId;
    console.log("cart ", CartId);
    try {
        let result = await shopping.DeleteAllProducts(CartId);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});



// ORDERS PAGE:

app.post(`/SubmitOrder`, async(req, res) => {

    let customer_id = req.body.customer_id;
    let cart_id = req.body.cart_id;
    let total_price = req.body.total_price;
    let city = req.body.city;
    let street = req.body.street;
    let shipping_date = req.body.shipping_date;
    let order_date = req.body.order_date;
    let credit = req.body.credit;

    try {
        let result = await orders.SubmitOrder(customer_id, cart_id, total_price, city, street, shipping_date, order_date, credit);

        console.log(result);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


var today = new Date();
let i = today.toLocaleDateString(); //index for creating diferent files

app.get('/DownloadRecipt/:cart_id/:total_price/:Recipt', async(req, res) => {
    let cart_id = req.params.Cart;
    let total_price = req.params.total_price;
    let Recipt = JSON.parse(req.params.Recipt);
    console.log("cart ", total_price, cart_id, Recipt);

    let arr = [];

    try {

        fs.writeFileSync(`Recipts/Recipt_${i}.text`, 'Product Name | Quantity | Total Price   \n-------------------------------------\n   ', function(err) {
            if (err) throw err;
        });

        fs.appendFile(`Recipts/Recipt_${i}.text`,
            Recipt.map((product) => {
                let Product = JSON.stringify(product)
                let Row = 'ש"ח  ' + product['p_name'] + '          ' + product.p_quantity + '          ' + product.p_total_price + '   ';
                return Row
            }).join('\n   '),
            (err) => { console.log(err ? 'Error :' + err : 'ok') }
        );

        fs.appendFile(`Recipts/Recipt_${i}.text`, '\n ------------------------------------ \n   ש"ח  ' + 'TOTAL PRICE:                ' + total_price, function(err) {
            if (err) throw err;
            i++;
        });

        let massage = true;
        res.send(massage);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


//ADMIN PAGE:

app.get(`/CheckSession`, (req, res) => {
    let Session = true;
    console.log('exist', sess.password);
    if (sess.password) {
        try {
            res.send(Session);

        } catch (err) {
            console.log("error is ", err);
        }
    } else {
        Session = false;;
        console.log("no session", Session);
        res.send(Session);
    }
    res.end();
});


app.post(`/AddProduct`, async(req, res) => {

    let product_name = req.body.product_name;
    let price = req.body.price;
    let category_id = req.body.category_id;
    let image = req.body.image;

    try {
        let result = await admin.AddProduct(product_name, price, category_id, image);
        console.log('productsss', result);
        res.send(result);
        res.end()
    } catch (err) {
        console.log("error is ", err);
    }
});

app.put(`/EditProduct`, async(req, res) => {

    let product_id = req.body.product_id;
    let product_name = req.body.product_name;
    let product_price = req.body.product_price;
    let category_id = req.body.category_id
    let image = req.body.image;

    try {
        let result = await admin.updateStudents(product_id, product_name, product_price, category_id, image);
        res.send(result);
        res.end();
    } catch (err) {
        console.log("error is ", err);
    }
});


// specify the folder
app.use(express.static(path.join(__dirname, 'pictures')));
// headers and content type
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var storage = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        // cb(null, '../pictures/')
        cb(null, '../src/assets/pictures/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });


app.post("/upload", upload.array("uploads[]", 12), function(req, res) {
    console.log('product : ', req.body)
    res.send(req.files);
});





app.listen(4000, () => {
    console.log("Server Start");
});