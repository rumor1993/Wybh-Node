const { Router } = require('express');
const router = Router();
const controllers = require('./message');

router.get("/", controllers.findMessage)

router.get("/:id", controllers.findMessageById)

router.post("/", controllers.createMessage)

module.exports = router;
