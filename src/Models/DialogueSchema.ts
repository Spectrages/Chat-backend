import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IDialogue extends Document {
    owner: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: boolean,
    };
    partner: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: boolean,
    };
    messages: [{
        type: Schema.Types.ObjectId,
        ref: string,
    }];
}

const DialogueSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: `User`,
        require: true,
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: `User`,
        require: true,
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: `Message`,
    },
}, {
    timestamps: true
});

const DialogueModel = mongoose.model<IDialogue>("Dialogue", DialogueSchema);
export default DialogueModel;