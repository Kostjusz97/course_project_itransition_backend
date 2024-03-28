const Router = require('express')
const router = new Router()
const CollectionController = require('../controllers/collectionController')

router.post('/create', CollectionController.create)
router.get('/:id', CollectionController.getOne)
router.get('/', CollectionController.getAll)
router.get('/user/:id', CollectionController.getMyCollections)
router.delete('/remove/:id', CollectionController.remove)
router.patch('/update/:id', CollectionController.update)


module.exports = router 