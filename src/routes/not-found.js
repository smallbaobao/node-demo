module.exports = (req, res, next) => {
    const err = new Error('APi Not Found');
    err.status = 404;
    next(err);
};