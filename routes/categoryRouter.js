const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), CategoryController.create)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.delete('/remove', checkRole('ADMIN'), CategoryController.remove)

module.exports = router 