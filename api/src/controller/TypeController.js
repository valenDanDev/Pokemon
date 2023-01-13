const {default: axios} = require("axios");
const {Type}= require("../db.js");

const types = async() => {
    try {
        let typePokemons = await axios.get("https://pokeapi.co/api/v2/type")
        let response = typePokemons.data.results?.map((res)=>{
            return {
                name: res.name
            }
        })
        response.forEach(async(r) => {
            await Type.findOrCreate({
                where:{
                    name: r.name
                }
            })
        });
   
    } catch (error) {
        return error.message
    }
}

const getallTypes= async (req,res)=>{
    // console.log("get ALL activities");
     try{
       let activities= await Type.findAll()
   
       if(!Object.keys(activities).length){
         return res.status(404).json({
           msg: "Activities not found in database"
       })
       }
       return res.status(200).send(activities)
   }catch(err){
       return res.status(404).send(err.message);
   }
   }

module.exports = {types,getallTypes}; 