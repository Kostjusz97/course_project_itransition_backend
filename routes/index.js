const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const collectionRouter = require('./collectionRouter');
const itemRouter = require('./itemRouter');


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/collection', collectionRouter)
router.use('/item', itemRouter)

module.exports = router
