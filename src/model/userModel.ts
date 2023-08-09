import mongoose from 'mongoose';
import {connect} from '@/dbConfig/dbConfig';

connect();
interface IUser {
    username: string,
    email: string,
    password: string,
    isValidated: boolean,
    isAdmin: boolean,
}
const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please, provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please, provide a password"],
    },
    isValidated: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;