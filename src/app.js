const express = require('express');
const models = require('../models');

const app = express();
const port = 3000;

app.get('/create', async (req, res) => {
    const { firstName, lastName, email } = req.query;
    const user = await models.User.create({
        firstName,
        lastName,
        email
    });

    res.json({
        msg: '创建成功',
        user,
    })
});

app.get('/users', async (req, res) => {
    const users = await models.User.findAll();

    res.json({
        msg: '查询成功',
        users,
    });
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await models.User.findOne({
        where: {
            id,
        }
    });

    res.json({
        msg: '查询成功',
        user: user || [],
    });
});

app.listen(port, () => console.log(`服务器已启动 port ${port}!`));
