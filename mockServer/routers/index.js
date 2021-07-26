const express = require('express')
const router = express.Router()

router.use(require('./modules/login'))
router.use(require('./modules/moduleSetting'))
router.use(require('./modules/ReviewAudit'))
router.use(require('./modules/upload'))
router.use(require('./modules/addTopic'))
router.use(require('./modules/topicPmp'))
router.use(require('./modules/topicEditor'))
router.use(require('./modules/article'))


module.exports = router
