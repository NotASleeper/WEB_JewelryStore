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

//cài đặt static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

//dùng router
app.use("/api/v1", rootRouter);

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