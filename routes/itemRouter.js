const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/itemController')

router.post('/create', ItemController.create)
router.get('/:id', ItemController.getOne)
router.get('/', ItemController.getAll)
router.get('/collection/:id', ItemController.getCollectionItems)
router.delete('/remove/:id', ItemController.remove)
router.patch('/update/:id', ItemController.update)


module.exports = router 