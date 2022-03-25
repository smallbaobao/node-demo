const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const models = require("../../models");

/** 查询所有菜单 */
router.get("/menus", async (req, res, next) => {
  try {
    const menus = await models.Menus.findAll();

    res.json({
      message: "查询成功",
      menus,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 新增菜单
 * @param {string} parentId 父级id，若没有则是一级菜单
 * @param {string} name 菜单名称
 * @param {path} name 菜单路径
 */
router.post("/createMenu", async (req, res, next) => {
  const { parentId, name, path } = req.body;

  if (!name || !path) {
    res.json({
      message: "请填写菜单名称或路径",
    });

    return;
  }

  const [menu, created] = await models.Menus.findOrCreate({
    where: {
      [Op.or]: [{ name }, { path }],
    },
    defaults: {
      parentId: parentId || 0,
      name,
      path,
    },
  });

  if (created) {
    res.json({
      message: "新增成功",
      menu,
    });

    return;
  }

  res.json({
    message: "菜单名称或路径已存在",
  });
});

/**
 * 编辑菜单
 * @param {id} id 编辑菜单的id
 * @param {string} name 菜单名称
 * @param {path} name 菜单路径
 */
router.post("/updateMenu", async (req, res, next) => {
  const { id, name, path } = req.body;

  if (!id) {
    res.json({
      message: "菜单id不存在",
    });

    return;
  }

  const updateMenu = {};

  if (name) {
    updateMenu.name = name;
  }

  if (path) {
    updateMenu.path = path;
  }

  const menu = await models.Menus.update(updateMenu, {
    where: {
      id,
    },
  });

  res.json({
    message: "更新成功",
    id: menu[0],
  });
});

module.exports = router;
