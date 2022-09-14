const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProducts = sequelize.define('basket_products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Products = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER},
    description: {type: DataTypes.TEXT}
})

const Images = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING},
    preview: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.STRING, allowNull: false},
    idKey: {type: DataTypes.INTEGER, allowNull: false, unique: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProducts)
BasketProducts.belongsTo(Basket)

Products.hasMany(BasketProducts)
BasketProducts.belongsTo(Products)

Products.hasMany(Images)
Images.belongsTo(Products)

Type.hasMany(Products)
Products.belongsTo(Type)

Products.hasMany(ProductInfo);
ProductInfo.belongsTo(Products)

module.exports = {
    User,
    Basket,
    BasketProducts,
    Products, 
    Images,
    ProductInfo,
    Type
}