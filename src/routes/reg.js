const express = require("express");
const router = express.Router();

const models = require("../../models");

router.post("/reg", async (req, res, next) => {
  try {
    const { name, password, captcha } = req.body;

    const captchaCookie = req.cookies.captcha || "";
    console.log(captchaCookie, "注册验证码--取cookie");

    if (captcha.toUpperCase() !== captchaCookie.toUpperCase()) {
      res.json({
        success: false,
        message: "验证码不正确",
      });

      return;
    }

    if (!name || !password) {
      res.json({
        success: false,
        message: "name 或 password为空",
      });

      return;
    }

    const [user, created] = await models.User.findOrCreate({
      where: { name },
      defaults: {
        name,
        password,
      },
    });

    if (created) {
      res.json({
        success: true,
        message: "注册成功",
        user,
      });

      return;
    }

    res.json({
      success: false,
      message: "用户已注册",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
