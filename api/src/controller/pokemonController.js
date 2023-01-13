const { Router } = require('express');
//const fetch=require('node-fetch');
const { Pokemon,Type} = require("../db.js");

// GET /pokemons:
const getAllPokemons = async (req, res) => {
    try {     
        //bring all pokemons from API                                 
        const apiPokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then(data => data.json())
            .then(json => Promise.all(json.results.map(poke => fetch(poke.url)
                .then(data => data.json())
            )))
        //bring pokemons from database 
        const dataBasePokemon = Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }})
        
        return Promise.all([apiPokemon,dataBasePokemon])

        .then((pokemons) => { 
            const apiPoke = pokemons[0].map( p => {
                return {
                    id_Pokemon: p.id,
                    name: p.name,
                    health: p.stats[0].base_stat,
                    attack: p.stats[1].base_stat,
                    defense: p.stats[2].base_stat, 
                    speed: p.stats[5].base_stat, 
                    height: p.height, 
                    weight: p.weight,
                    types: p.types.map(p => p.type.name),
                    image: p.sprites.other["home"].front_default,
                }});
            
            const dbPoke= pokemons[1].map( p => {
        
                return {
                    id_Pokemon: p.id_Pokemon,
                    name: p.name,
                    health: p.health,
                    attack: p.attack,
                    defense: p.defense,
                    speed: p.speed ,
                    height: p.height, 
                    weight: p.weight,
                    types: p.Types.map(p => p.name),   
                    image: p.image,
                }
            });
        
            const allPokemons = apiPoke.concat(dbPoke); 

            const name = req.query.name;
            if (name) {
                let pokemonByName = allPokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))
                if(pokemonByName) {
                    return res.status(200).send(pokemonByName);
                } else{
                    return res.status(404).send("Lo sentimos, el Pokemon no existe. Intenta con otro nombre");
                }
            }
            res.status(200).send(allPokemons);
            });

    } catch (error) {
        return res.status(404).send(error.message)
    }
};


module.exports={
    getAllPokemons
}