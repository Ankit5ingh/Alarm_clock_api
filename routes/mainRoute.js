const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("C:UserslpsinDesktopApi_startPoint/index.html");
});

module.exports = router