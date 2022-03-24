# 服务启动
```shell script
npm install mysql -g
brew services start mysql
```

# 项目启动
```shell script
npm install
npm start
```

# sequelize文档链接
> https://www.sequelize.com.cn/other-topics/migrations#%E5%88%9B%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%A8%A1%E5%9E%8B%E5%92%8C%E8%BF%81%E7%A7%BB

### 新增模型
```shell script
# using npm
npx sequelize-cli model:generate --name [表名] --attributes [字段]:[类型],[字段]:[类型]
# using yarn
yarn sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```
### 建表
```shell script
# using npm
npx sequelize-cli db:migrate
# using yarn
yarn sequelize-cli db:migrate
```