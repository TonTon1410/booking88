const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/badminton-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Đặt thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Định tuyến trang chủ
app.get('/', (req, res) => {
    res.render('index');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
