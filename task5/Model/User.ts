import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUser extends Document{
    username: string,
    password:string
}
const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});
const User = mongoose.model<IUser>('User', userSchema);
export default User;
