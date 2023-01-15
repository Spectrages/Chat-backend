import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IDialogue extends Document {
    _id: string,
    author: string,
    partner: string,
}

const DialogueSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: `User`
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: `User`
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: `Message`
    },
}, {
    timestamps: true
});

const DialogueModel = mongoose.model<IDialogue>("Dialogue", DialogueSchema);
export default DialogueModel;