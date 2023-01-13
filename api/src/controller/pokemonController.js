
const pokeSchema= require("../models/Pokemon.js")

const getPokemons= async (req,res)=>{
    try {
        const {name} = req.query

        if(name){
            const pokemon = await pokeSchema.find();
            const poke= pokemon.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(poke){
                return res.status(200).json(poke)
            }else{
                return res.status(404).json({error: "Nombre invalido"})
            }
            
        }else{
            const pokemons = await pokeSchema.find()
            return res.status(200).json(pokemons)
        }
    }
    catch(error) {
        return res.status(404).json({error:error.message})
    }
}

const getPokemonsDetail = async(req,res) =>{
    try {
        const {id}= req.params;
        if(!id){
            return res.status(404).json({error: "No hay id"})
        }
        const pokemon = await pokeSchema.find({ _id: id });
        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(404).json({error:error})
    }
}

const postPokemons = async(req,res) =>{
    try {
        const {name,health,attack,defense,speed,height,weight, img, types}= req.body;
        if( !name ||!health || !attack || !defense ||!speed ||!height ||!weight ||!img ||!types){
            return res.status(404).json({error: "No hay suficientes datos"})
        }
        let id=Math.floor((Math.random() * (2000000000 - 1000 + 1)) + 1000)
        const pokemon = await pokeSchema({name,health,attack,defense,speed,height,weight,img,types});
        const createPokemon = await pokemon.save()

        return res.status(200).json(createPokemon)
        
    } catch (error) {
        return res.status(404).json({error:error})
    }
}

const deletePokemons=async(req,res)=>{
    const { id } = req.params;

    try {
        if(!id)return res.send("No ID was sent.")

        await pokeSchema.findByIdAndDelete(id, function (err, pokemon) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", pokemon); 
            }
        });
        return res.status(200).json({success:"Your pokemon was deleted successfully."})
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}

module.exports={
    getPokemons,
    getPokemonsDetail,
    postPokemons,
    deletePokemons
}