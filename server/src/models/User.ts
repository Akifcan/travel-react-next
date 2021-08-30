import { Schema, model } from 'mongoose';

interface IUser{
    username: string,
    email: string,
    password: string,
    createdAt: Date
}

const schema = new Schema<IUser>({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    avatar: {
        type: String,
        require: false,
        default: 'user-avatars/default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default  model<IUser>('User', schema);
