const { Router } = require("express");
const UserRooms = require("../../models/UserRooms");
const router = Router();
const controllers = require("./users");

// Users 전체조회
router.get("/", controllers.findUsers);

// Users 개별조회
router.get("/:id", controllers.findUsersById);

// Users 추가
router.post("/", controllers.createUsers);

// Users 수정
router.put("/:id", controllers.updateUsers);

router.put("/:id/token", controllers.updateUsersByToken);

router.get("/rooms/:id", controllers.findMessageByUsersId);

router.delete("rooms/:id", controllers.deleteUserRooms);

module.exports = router;
