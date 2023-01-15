import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { UserController } from './controllers'

const PORT: number= 5000;

// const OPTIONS = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true
// };

const app = express();
app.use(bodyParser.json());

const MONGODB = process.env.MONGODB_URI || "mongodb+srv://spectrages:Spectrages15011997@cluster0.orfyg2s.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB);

const User = new UserController();


app.get(`/user/:id`, User.getOne);
app.get(`/users`, User.getAll);
app.post("/registration", User.create);
app.delete(`/delete/:id`, User.delete);

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`)
});