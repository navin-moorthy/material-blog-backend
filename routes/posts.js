const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const postController = require("../controllers/post");
const multerMiddleware = require("../middleware/multer-file");

router.post("", checkAuth, multerMiddleware, postController.newPosts);

router.put("/:id", checkAuth, multerMiddleware, postController.updatePost);

router.get("", postController.getPosts);

router.get("/:id", postController.showPosts);

router.delete("/:id", checkAuth, postController.deletePosts);

module.exports = router;
