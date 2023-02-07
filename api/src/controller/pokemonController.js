const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

let dbID = 10000;
//
// trae pokemons de la API
async function getPokemonsAPI() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=40"
    );
    const data = Promise.all(
      response.data.results.map(async (pokemon) => {
        let subRequest = await axios.get(pokemon.url);
        let pokemonResult = {
          name: subRequest.data.name,
          id: Number(subRequest.data.id),
          hp: subRequest.data.stats[0].base_stat,
          attack: subRequest.data.stats[1].base_stat,
          defense: subRequest.data.stats[2].base_stat,
          speed: subRequest.data.stats[4].base_stat,
          height: subRequest.data.height,
          weight: subRequest.data.weight,
          image: subRequest.data.sprites.other.home.front_default,
          types: subRequest.data.types.map((type) => {
            return { name: type.type.name };
          }),
          created: "false",
        };
        return pokemonResult;
      })
    );
    return data;
  } catch (error) {
    return error;
  }
}
async function getPokemonsAPIv2(lim) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${lim}&limit=40`
    );
    const data = Promise.all(
      response.data.results.map(async (pokemon) => {
        let subRequest = await axios.get(pokemon.url);
        let pokemonResult = {
          name: subRequest.data.name,
          id: Number(subRequest.data.id),
          hp: subRequest.data.stats[0].base_stat,
          attack: subRequest.data.stats[1].base_stat,
          defense: subRequest.data.stats[2].base_stat,
          speed: subRequest.data.stats[4].base_stat,
          height: subRequest.data.height,
          weight: subRequest.data.weight,
          image: subRequest.data.sprites.other.home.front_default,
          types: subRequest.data.types.map((type) => {
            return { name: type.type.name };
          }),
          created: "false",
        };
        return pokemonResult;
      })
    );
    return data;
  } catch (error) {
    return error;
  }
}

// Trae todos los pokemos de la DB y API
const getAllPokemons= async (req, res) => {
    try {   
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      through: {
        attributes: [],
      },
      attributes: ["name"],
    },
  });
  const ApiPokemons = await getPokemonsAPI();
  const allPokemons = ApiPokemons.concat(dbPokemons); 
  return res.status(200).json(allPokemons);
} catch (error) {
    return res.status(404).send(error.message)
}
};

// Obtener pokemon por ID
const getPokemonId= async (req, res) => {
  //const idPokemon = Number(req.params.id);
  const id = Number(req.params.idPokemon);
  console.log(id)
  if (typeof id === "number") {
    const pokemonDb = await Pokemon.findOne({
      where: {
        id: id,
      },
      include: {
        model: Type,
        through: {
          attributes: [],
        },
        attributes: ["name"],
      },
    });
    if (pokemonDb) {
      return res.json(pokemonDb);
    } else {
      const pokemonsApi = await getPokemonsAPI();
      const foundPokemon = pokemonsApi.find((p) => p.id === id);
      if (foundPokemon) {
        return res.json(foundPokemon);
      } else {
        return res.json("pokemon does not found with id "+id);
      }
    }
  }
  return res.send("id must be a number").status(404);
}

const getPokemonByName= async (req,res)=>{
  //console.log("get country by name");
  const name =req.query.q;
  console.log({name})
  try{
    let coun= await Pokemon.findAll({
      where: {
        name:{
          [Op.substring]: `%${name.toLowerCase()}%`
        }
      }, include: {
        model: Type,
        through: {
          attributes: [],
        },
        attributes: ["name"],
      },
    });
   
    if(!Object.keys(coun).length){
      const pokemonsApi = await getPokemonsAPI();
      const foundPokemon = pokemonsApi.find((p) => p.name === name);
       if (foundPokemon) {
        return res.json(foundPokemon);
      }else  if(!foundPokemon){
        let lim=40
        while(lim<1160){
          const pokemonsApiV2 = await getPokemonsAPIv2(lim);
          const foundPokemonV2 = pokemonsApiV2.find((p) => p.name === name);
          //console.log(lim)
          if (foundPokemonV2){
            return res.json(foundPokemonV2);
          }
          lim+=40
        }
      }
        return res.status(404).json({
          msg: `pokemon not found with name ${name}`
      })
      
    }
    return res.status(200).json(coun)
}catch(err){
    return res.status(404).send(err.message);
}
}

// Agregar pokemon a la DB
const addPokemon = async(req,res)=>{
  const { name,hp, attack, defense, speed, height, weight, image, types } =req.body;
    var i=0;
    let createdPokemon 
    let dataBaseType
    try {
  let pokemon = {
    id: ++dbID,
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  };
  //console.log(pokemon)
    createdPokemon = await Pokemon.create(pokemon);
     //console.log(createdPokemon);
     while(types.length>i){   
      var currenT=types[i].name
      console.log(currenT)
      i++;
    dataBaseType = await Type.findAll({
            where: {
                name: currenT
                    }
                });
      console.log(dataBaseType)
    createdPokemon.addType(dataBaseType);
              }
  } catch (error) {
    return error;
  }
 
return res.status(200).send(createdPokemon);
}



module.exports = {
  addPokemon,
  getPokemonsAPI,
  getAllPokemons,
  getPokemonId,
  getPokemonByName,
  getPokemonsAPIv2
};