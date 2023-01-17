import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
    read: {
        type: boolean,
        require: boolean,
    };
    text: {
        type: string,
        require: boolean,
    };
    dialogue: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: boolean,
    };
    user: {
        type: Schema.Types.ObjectId,
        require: boolean,
        ref: string
    },
}

const MessageSchema = new Schema({

    text: {
        type: String,
        require: Boolean,
    },
    dialogue: {
        type: Schema.Types.ObjectId,
        ref: 'Dialogue',
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    //TODO: attachments: ПРИКРЕПЛЕНИЕ ФАЙЛОВ

}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
export default MessageModel;