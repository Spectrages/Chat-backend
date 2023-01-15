import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
    _id:string,
    author: string,
    partner: string,
    text: string,
    dialogue: string,
    unread: boolean,
}

const MessageSchema = new Schema({
    author: {
        type: String,
    },
    partner: {
        type: String,
    },
    text: {
        type: String,
    },
    dialogue: {
        type: String,
    },
    unread: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
export default MessageModel;