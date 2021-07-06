const express = require('express')
const router = express.Router()

router.use(require('./modules/login'))
router.use(require('./modules/moduleSetting'))
router.use(require('./modules/ReviewAudit'))
router.use(require('./modules/upload'))


module.exports = router
