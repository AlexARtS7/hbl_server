const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, login, email, role) => {
    return jwt.sign(
        {id, login, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}
class UserController {
    async registration(req, res, next) {
        const {login, email, password, role} = req.body
        
        if(!email || !password || !login) {
            return next(ApiError.badRequest('Некоректный login, email или password'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует', 1))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, email, role, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.email, user.role)
        await Basket.create({userId: user.id})
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        
        if(!user) {
            return next(ApiError.internal('Пользователь с таким email не найден', 1))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль', 2))
        }
        const token = generateJwt(user.id, user.login, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()