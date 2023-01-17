import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email:string,
    password: string,
    fullname: string,
    confirmed: boolean,
    avatar?: string,
    confirm_hash?: string,
    last_seen?: Date,
}

//TODO: last seen

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date()
    },
}, {
    timestamps: true
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;