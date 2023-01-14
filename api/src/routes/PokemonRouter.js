const { Router } = require("express");
const {getAllPokemons,getPokemonId,addPokemon} = require("../controller/pokemonController.js")
const router = Router();

router.get('/',getAllPokemons)
router.get('/pokemon/:idPokemon',getPokemonId)
router.post('/create',addPokemon)

module.exports = router;