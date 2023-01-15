import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { UserController } from './controllers'

const PORT: number= 5000;

const app = express();
app.use(bodyParser.json());

const MONGODB = process.env.MONGODB_URI || "mongodb+srv://spectrages:Spectrages15011997@cluster0.orfyg2s.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB);

const User = new UserController();


app.get(`/user/:id`, User.index);
app.post("/registration", User.create);

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`)
});