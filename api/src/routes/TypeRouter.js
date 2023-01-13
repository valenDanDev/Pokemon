const { Router } = require("express");
const {types,getallTypes} = require("../controller/TypeController.js")

const router = Router();

router.get('/',getallTypes)

module.exports = router;