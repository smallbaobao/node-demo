const express = require("express");
const router = express.Router();

const models = require("../../models");

router.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.json({
        message: "name 或 password为空",
      });

      return;
    }

    const user = await models.User.findOne({
      where: {
        name,
        password,
      },
    });

    if (!user) {
      res.json({
        message: "用户不存在",
      });

      return;
    }

    res.json({
      message: "登录成功",
      name,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
