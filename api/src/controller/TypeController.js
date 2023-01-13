const typeSchema= require("../models/Type.js")

const getTypes= async (req,res)=>{
    try {
            const types = await typeSchema.find()
            return res.status(200).json(types)
    }
    catch(error) {
        return res.status(404).json({error:error.message})
    }
}

module.exports={
    getTypes,
}