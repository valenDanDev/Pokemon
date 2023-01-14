const { Router } = require("express");
const {getAllPokemons,getPokemonId,addPokemon,getPokemonByName} = require("../controller/pokemonController.js")
const router = Router();

router.get('/',getAllPokemons)
router.get('/pokemon/:idPokemon',getPokemonId)
router.get('/pokemon',getPokemonByName)
router.post('/create',addPokemon)

module.exports = router;