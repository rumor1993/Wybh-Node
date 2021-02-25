const { Router } = require('express');
const router = Router()

router.use('/admin', require('./admin'));
router.use("/users", require("./users"));
router.use("/message", require("./message"));

module.exports = router;