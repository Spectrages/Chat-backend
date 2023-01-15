import mongoose from 'mongoose'
import { Schema } from 'mongoose'

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
    last_seen: Date,
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;