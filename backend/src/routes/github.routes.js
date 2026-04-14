const router = require("express").Router();

const { analyzeGithub } = require("../controllers/github.controllers");

router.get("/analyze/:username", analyzeGithub);

module.exports = router;
