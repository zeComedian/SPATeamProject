const express = require("express");
const router = express.Router();

const checkAuth = require('@middleware/check-auth');
const checkAdmin = require('@middleware/check-admin');
const NewsController = require('@controllers/control-news');

router.get("/", NewsController.news_get);
router.get("/:newsId", NewsController.news_find);
router.get("/:newsId/comment", NewsController.news_comment);

router.post("/", checkAuth, checkAdmin, NewsController.news_create);
router.patch("/:newsId", checkAuth, checkAdmin, NewsController.news_update);
router.delete("/:newsId", checkAuth, checkAdmin, NewsController.news_delete);

module.exports = router;
