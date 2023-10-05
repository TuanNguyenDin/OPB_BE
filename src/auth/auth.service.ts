import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entities';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }
    async register(userData) {
        try {
            if (userData.password.length < 6) { throw new Error("Password should be at least 6 characters") }
            const hashpassword = await bcrypt.hash(userData.password, 12);
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            // await sendEmailVerification(auth.currentUser);
            const user = await new this.userModel({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: hashpassword,
                isAdmin: false
            }).save();
            return user;
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    throw new Error("Email already in use");
                case "auth/invalid-email":
                    throw new Error("Invalid email");
                case "auth/weak-password":
                    throw new Error("Password should be at least 6 characters");
                case "auth/operation-not-allowed":
                    throw new Error("Operation not allowed, please contact support");
                case "auth/too-many-requests":
                    throw new Error("Too many requests, please try again later.");
            }
        }
    }
    async login(userData) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            const user = await this.userModel.findOne({ name: userData.name } || { email: userData.email }).exec();
            if (!user) {
                throw new Error("User not found");
            }
            const jwt = await this.jwtService.signAsync({ id: user._id }, { secret: process.env.JWT_SECRET, expiresIn: process.env.EXPIRES_IN_SECONDS });
            return {
                user,
                jwt
            }
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    throw new Error("Invalid password");
                case "auth/user-not-found":
                    throw new Error("User not found");
                case "auth/too-many-requests":
                    throw new Error("Too many requests, please try again later.");
                default:
                    throw err;
            }
        }
    }
    async refreshToken(user) {
        const jwt = await this.jwtService.signAsync({ id: user._id });
        return {
            user,
            jwt
        }
    }
}

