const checkAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        // Nếu người dùng đã đăng nhập, tiếp tục xử lý request
        next();
    } else {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.redirect('/');
    }
}

module.exports = checkAuth;