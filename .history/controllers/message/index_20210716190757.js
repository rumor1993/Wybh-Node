const { Router } = require('express');
const router = Router();
const controllers = require('./message');

router.get("/", controllers.findMessage)

router.get("/:id", controllers.findMessageById)

router.get("/rooms/:id", controllers.findMessageRoomsById)

router.post("/", controllers.createMessage)

router.delete("/:id", controllers.messageDelete)



module.exports = router;
