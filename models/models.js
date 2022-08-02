const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    phone: {type: DataTypes.INTEGER, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Products = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.TEXT, defaultValue: 'ds' }
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

const ProductDescription = sequelize.define('product_description', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.TEXT, allowNull: false}
})

Type.hasMany(Products)
Products.belongsTo(Type)

Products.hasMany(ProductInfo);
ProductInfo.belongsTo(Products)

Products.hasOne(ProductDescription);
ProductDescription.belongsTo(Products)

module.exports = {
    User,
    Products, 
    ProductInfo,
    ProductDescription,
    Type
}