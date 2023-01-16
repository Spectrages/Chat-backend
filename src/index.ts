import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { UserController, DialogueController, MessagesController } from './controllers'

const PORT: number= 5000;

// const OPTIONS = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true
// };

const app = express();
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://spectrages:Spectrages15011997@cluster0.orfyg2s.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => console.log(`Database started`))
    .catch(error => console.log(error.reason));

const User = new UserController();
const Dialogue = new DialogueController();
const Messages = new MessagesController();


app.get(`/user/:id`, User.getOne);
app.delete(`/user/:id`, User.delete);
app.post("/registration", User.create);

app.get(`/dialogues/:id`, Dialogue.getOne);
app.delete(`/dialogues/:id`, Dialogue.delete);
app.post(`/dialogues`, Dialogue.create);

app.get(`/messages`, Messages.getOne);
// app.delete(`/messages/:id`, Messages.delete);
// app.post(`/messages`, Messages.create);

app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`)
});