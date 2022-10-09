const {Categories} = require('../models/models')

class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Categories.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const category = await Categories.findAll()
        return res.json(category)
    }

}

module.exports = new CategoryController()
