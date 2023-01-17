import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import {
    UserController,
    DialogueController,
    MessagesController
} from './Controllers'
import { updateLastSeen } from "./Middleware";
import dotenv from 'dotenv'
import {stringify} from "querystring";

// const OPTIONS = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true
// };

const app = express();
app.use(bodyParser.json());
app.use(updateLastSeen);
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI || '';
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => console.log(`Database started`))
    .catch(error => console.log(error.reason));

const User = new UserController();
const Dialogue = new DialogueController();
const Messages = new MessagesController();


app.get(`/user/:id`, User.index);
app.delete(`/user/:id`, User.delete);
app.post("/registration", User.create);

app.get(`/dialogues/:id`, Dialogue.index);
app.delete(`/dialogues/:id`, Dialogue.delete);
app.post(`/dialogues`, Dialogue.create);

app.get(`/messages`, Messages.index);
app.delete(`/messages/:id`, Messages.delete);
app.post(`/messages`, Messages.create);

app.listen(process.env.PORT, function(){
    console.log(`Server started on port ${process.env.PORT}`)
});