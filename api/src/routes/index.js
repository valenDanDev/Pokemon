const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokeSchema= require("../models/Pokemon.js")
const typeSchema= require("../models/Type.js")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {getPokemons, getPokemonsDetail,postPokemons,deletePokemons} = require("../controller/pokemonController.js");
const {getTypes} = require("../controller/TypeController.js")

router.get("/pokemons", getPokemons )
router.get("/pokemons/:id", getPokemonsDetail)
router.post("/pokemons", postPokemons)
router.delete("/pokemons/:id", deletePokemons )
router.get("/types", getTypes )

module.exports = router;
