const { Router } = require("express");
const {getAllPokemons} = require("../controller/pokemonController.js")
const router = Router();

router.get('/',getAllPokemons)


module.exports = router;