import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
    unread: boolean;
    text: {
        type: string,
        require: boolean,
    };
    dialog: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true,
    };
};

const MessageSchema = new Schema({

    text: {
        type: String,
        require: Boolean
    },

    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Dialogue"
    },
    //attachments
    unread: Boolean,

}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
export default MessageModel;