const express = require('express');
const router = express.Router();

const models = require('../../models');

router.post('/reg', async (req, res, next) => {
    try {
        const {
            name,
            password,
            captcha,
        } = req.body;

        const captchaCookie = req.cookies.captcha || '';
        console.log(captchaCookie, '注册验证码--取cookie');

        if (captcha.toUpperCase() !== captchaCookie.toUpperCase()) {
            res.json({
                message: '验证码不正确',
            });

            return;
        }

        if (!name || !password) {
            res.json({
                message: 'name 或 password为空',
            });

            return;
        }

        // 查找是否用户已存在
        const userCreated = await models.User.findOne({
            where: {
                name,
            }
        }) || {};

        if (userCreated.name === name) {
            res.json({
                message: '用户已注册',
            });

            return;
        }

        const user = await models.User.create({
            name,
            password,
        });

        res.json({
            message: '注册成功',
            user,
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;