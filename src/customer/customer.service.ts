import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import customers from './customerDTO/customer.dto';
import { Customer } from './customerDTO/customer.schema';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from 'src/firebaseConfig';


@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private CustomerModel: Model<Customer>) { }
    async createCustomers(customerDTO: customers) {
        return new this.CustomerModel(customerDTO).save();
    }
    async findByName(name: string) {
        return this.CustomerModel.findOne({ name: name }).exec();
    }
    async findByEmail(email: string) {
        return this.CustomerModel.findOne({ email: email }).exec();
    }
    async findByID(id: string) {
        return this.CustomerModel.findOne({ _id: id }).exec();
    }
}

const auth = getAuth(app);

export class AuthService {
    async register(email: string, password: string) {
        try {
            const userCredential  = await createUserWithEmailAndPassword(auth, email, password)
            await sendEmailVerification(auth.currentUser);
            return userCredential;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async login(email: string, password: string) {
        try {
            const userRecord = signInWithEmailAndPassword(auth, email, password);
            // Đăng nhập thành công, trả về thông tin người dùng
            return (await userRecord).user.getIdToken(true);
        } catch (error) {
            throw new Error('Error logging in: ' + error.message);
        }
    }
    async sendVericationEmail() {
        try {
            await sendEmailVerification(auth.currentUser);
            return true;
        } catch (error) {
            throw new Error('Error sending verification email: ' + error.message);
        }
    }
}
