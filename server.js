const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const { rootRouter } = require('./routers');
const app = express();
const cors = require('cors');

//cài ứng dụng kiểu json
app.use(express.json());

//dùng cors để gọi api
app.use(cors());



//dùng router
app.use("/api/v1", rootRouter);

//cài đặt static file cho manager
app.use(express.static(path.join(__dirname, 'html')));
app.use( express.static(path.join(__dirname, 'html/manager')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/login.html'));
});

app.use('/admin', express.static(path.join(__dirname, 'html/manager')));
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/dashboard.html'));
});

app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/dashboard.html'));
});

app.get('/admin/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/manager/product.html'));
});


app.use('/sale', express.static(path.join(__dirname, 'html/sale_employee')));
app.get('/sale', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale/dashboard.html'));
});

app.get('/sale/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/dashboard.html'));
});

app.get('/sale/customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/customer.html'));
});

app.get('/sale/service', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/preorder', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/pre-order.html'));
});

app.get('/sale/refund', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/refund.html'));
});

app.get('/sale/warranty', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/warranty.html'));
});

app.get('/sale/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/profile.html'));
});

app.get('/sale/addnewcustomer', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/add_new_customer.html'));
});

app.get('/sale/customerinfo', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/sale_employee/customer_info.html'));
});


app.use('/warehouse',express.static(path.join(__dirname, 'html/warehouse_employee')));
app.get('/warehouse', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/warehouse_employee/product.html'));
});

app.get('/warehouse', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/warehouse_employee/product.html'));
});

app.get('/warehouse/import', (req, res) => {
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