import { Schema, model } from "mongoose";

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    address: {
        type: String
    },
})

export const Person = model('person', personSchema)