const { Category } = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const candidateCat = await Category.findOne({where: {name}})
            if (candidateCat) {
                return next(ApiError.badRequest('Category with email already exists'))
            }
            const category = await Category.create({name})
            return res.json(category)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create category' })
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Category.findAll()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve categories' })
        }
    }

    async getOne(req, res) {
        const id = req.params.id
        try {
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(404).json({ error: 'Category not found' })
            }
            res.json(category)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve category' })
        }
    }

    async remove(req, res) {
        const { id } = req.body
        try {
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(404).json({ error: 'Category not found' })
            }
            await category.destroy()
            return res.json({ message: 'Category removed successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to remove category' })
        }
    }
}

module.exports = new CategoryController()