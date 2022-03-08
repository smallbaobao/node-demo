module.exports = (err, req, res, next) => {
    if (err) {
        console.log(err, 'error日志');
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};