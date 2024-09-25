import mongoose from 'mongoose';
const { Schema } = mongoose;

const cardSchema = new Schema({
    character: String,
    cost: Number,
    power: Number,
    cardText: String,
    imgPath: String
});

const Card = mongoose.model('starterCard', cardSchema);
export default Card;
