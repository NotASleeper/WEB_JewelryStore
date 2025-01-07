const express = require('express');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./models');
const { rootRouter } = require('./routers');
const app = express();
const cors = require('cors');
const checkAuth = require('./middlewares/validations/checkAuth');
const cloudinary = require('./middlewares/upload/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const bodyParser = require('body-parser');

//Thiết lập cloudinary để lưu ảnh
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "STORE",
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],

})
const upload = multer({
    storage: storage,
})

//Thiết lập payload
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(session({
    secret: '123456', // Thay thế bằng một chuỗi bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Đặt thành true nếu bạn sử dụng HTTPS
        maxAge: 3600000 // 1 hour in milliseconds
    }
}));
//cài ứng dụng kiểu json
app.use(express.json());

//dùng cors để gọi api
app.use(cors());

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out.');
        }
        res.redirect('/');
    });
};

app.get('/logout', (req, res) => {
    logout(req, res);
});

app.post('/upload', upload.fields([{ name: "img", maxCount: 1 }]), (req, res) => {
    try {
        console.log('Uploaded files:', JSON.stringify(req.files, null, 2));

        if (req.files && req.files.img && req.files.img[0]) {
            const link_img = req.files.img[0].path; // Accessing the file path
            res.send({ link_img }); // Send a JSON response
        } else {
            res.status(400).send({ error: 'No file uploaded or incorrect field name' });
        }
    } catch (error) {
        console.error('Upload Error:', JSON.stringify(error, null, 2));
        res.status(500).send({ error: error.message });
    }
});




//dùng router
app.use("/api/v1", rootRouter);

//cài đặt static file cho manager
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'html/manager')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/login.html'));
});

app.use('/admin', express.static(path.join(__dirname, 'html/manager')));
app.get('/admin', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/dashboard.html'));
});

app.get('/admin/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/dashboard.html'));
});

app.get('/admin/product', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/product.html'));
});


app.use('/sale', express.static(path.join(__dirname, 'html/sale_employee')));
app.get('/sale', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/dashboard.html'));
});

app.get('/sale/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/dashboard.html'));
});

app.get('/sale/customer', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/customer.html'));
});

app.get('/sale/service', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/preorder', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/refund', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/refund.html'));
});

app.get('/sale/warranty', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/warranty.html'));
});

app.get('/sale/profile', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/profile.html'));
});

app.get('/sale/addnewcustomer', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/add_new_customer.html'));
});

app.get('/sale/customerinfo', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/customer_info.html'));
});

app.get('/sale/productinfo', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/product_info.html'));
});
app.get('/sale/productinfo0', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/product_info_outofstock.html'));
});

app.get('/sale/checkout', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/checkout.html'));
});

app.get('/sale/service', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/preorder', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/preorderinfo', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order_info.html'));
});

app.get('/sale/warranty', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/warranty.html'));
});

app.get('/sale/warrantyinfo', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/warranty_info.html'));
});

app.get('/sale/refund', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/refund.html'));
});

app.get('/sale/refundinfo', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/refund_info.html'));
});


app.use('/warehouse', express.static(path.join(__dirname, 'html/warehouse_employee')));
app.get('/warehouse', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/warehouse_employee/product.html'));
});

app.get('/warehouse', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/warehouse_employee/product.html'));
});

app.get('/warehouse/import', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'html/warehouse_employee/import.html'));
});

//lắng nghe sự kiện kết nối
app.listen(5501, async () => {
    console.log('App listening on http://localhost:5501');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});