const express = require("express");
const checkAuth = require("../middleware/check-auth");
const profileControllers = require("../controllers/profile");
const fileExtract = require("../middleware/file");


const router = express.Router();


router.post(
  "",
  checkAuth,
  fileExtract,
  profileControllers.profileCreate

);

router.put("/:id",
  checkAuth,
  fileExtract,
  profileControllers.profileEdit
  
);

router.put("/social",
  fileExtract,
  profileControllers.socialLogin
  
);

router.get("", profileControllers.profileGet);

router.delete("/:id", checkAuth, profileControllers.profileDelete);

module.exports = router;