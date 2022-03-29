module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err, "error日志");
    res.status(err.status || 500).json({
      success: err.success || false,
      message: err.message || "500-网络异常",
    });
  }
};
