const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const app = express();

//cài ứng dụng kiểu json
app.use(express.json());

//cài đặt static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

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