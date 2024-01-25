const {Schema, model} = require("mongoose")

const eventSchema =new Schema(
    {
        titel:{
            type: String,
        }
        description :{type :String}

    }
)