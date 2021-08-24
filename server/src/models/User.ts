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
        unique: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default  model<IUser>('User', schema);
