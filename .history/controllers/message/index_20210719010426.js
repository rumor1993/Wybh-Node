const { Router } = require("express");
const router = Router();
const controllers = require("./message");

router.get("/", controllers.findMessage);

router.get("/:id", controllers.findMessageById);

router.get("/rooms/:id", controllers.findMessageRoomsById);

router.post("/", controllers.createMessage);

router.delete("/:id", controllers.messageDelete);

// 읽음처리 API 추가
router.put("message/:id", controllers.readMessage);

module.exports = router;
