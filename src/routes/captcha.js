const express = require("express");
const router = express.Router();

/**
 * @see https://www.npmjs.com/package/svg-captcha
 */
const svgCaptcha = require("svg-captcha");

router.get("/captcha", (req, res, next) => {
  /** 创建验证码 */
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: "0o1i",
    noise: 6,
    color: true,
    background: "#ccc",
    height: "32",
  });

  res.type("svg");

  console.log(captcha.text, "注册验证码--存cookie");

  res.cookie("captcha", captcha.text).json({
    success: true,
    captcha: captcha.data,
  });
});

module.exports = router;
