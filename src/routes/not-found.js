module.exports = (req, res, next) => {
    const err = new Error('API Not Found');
    err.status = 404;
    next(err);
};