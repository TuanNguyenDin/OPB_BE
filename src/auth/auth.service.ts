import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { auth, firebaseConfig } from '../firebaseConfig'
import { IdTokenResult, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateCurrentUser, updatePassword } from 'firebase/auth';
import { JwtService } from '@nestjs/jwt';
import { Account } from './entities/user.entities';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Account') private AccountModel: Model<Account>, private jwtService: JwtService) { }
  async register(userData) {
    const userExist = await this.AccountModel.findOne({
      $or: [
        { email: userData.email },
        { phone_number: userData.email }
      ]
    }).exec();
    console.log(userExist);

    if (userExist) {
      throw new HttpException("User already exists", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      if (userData.password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }

      const hashpassword = await bcrypt.hash(userData.password, 12);
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);//lưu tài khoản và password vào firebase

      // Check if userData contains necessary properties for updating the current user
      // if (userData.displayName || userData.photoURL) {
      //   await updateCurrentUser(auth, userData);
      // }

      // await sendEmailVerification(auth.currentUser);//hàm gọi chức năng gửi mail xác nhận đăng kí của user
      // lưu thông tin người dùng vào database
      userData.password = hashpassword;
      userData.status = 'activated';
      const user = await this.AccountModel.create(userData);
      return user;
    } catch (err) {
      //lỗi được firebase trả về 
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new HttpException("Email already in use", HttpStatus.INTERNAL_SERVER_ERROR);//người dùng đã tồn tại
        case "auth/invalid-email":
          throw new HttpException("Invalid email", HttpStatus.INTERNAL_SERVER_ERROR);//email sai định dạng
        case "auth/weak-password":
          throw new HttpException("Password should be at least 6 characters", HttpStatus.INTERNAL_SERVER_ERROR);// mật khẩu yếu
        case "auth/operation-not-allowed":
          throw new HttpException("Operation not allowed, please contact support", HttpStatus.INTERNAL_SERVER_ERROR);//server firebase lỗi
        case "auth/too-many-requests":
          throw new HttpException("Too many requests, please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);//quá nhiều request
      }
    }
  }
  async login(userData) {
    try {
      //xác thực đăng nhập người dùng với database
      const user = await this.AccountModel.findOne({
        $or: [
          { email: userData.email },
          { phone_number: userData.email }
        ]
      }).exec();
      if (!user) {
        throw new HttpException("User not found", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const userCredential = await signInWithEmailAndPassword(auth, user.email, userData.password);//xác thực đăng nhập người dùng với firebase
      const jwt = await this.jwtService.signAsync({ id: user._id }, { secret: process.env.JWT_SECRET, expiresIn: process.env.EXPIRES_IN_SECONDS });// tạo jwt token
      return {
        user,
        jwt
      }
    } catch (err) {
      //lỗi được firebase trả về
      switch (err.code) {
        case "auth/invalid-login-credentials":
          throw new HttpException("Invalid password", HttpStatus.INTERNAL_SERVER_ERROR);//sai password
        case "auth/user-not-found":
          throw new HttpException("User not found", HttpStatus.INTERNAL_SERVER_ERROR);//không tìm thấy người dùng
        case "auth/too-many-requests":
          throw new HttpException("Too many requests, please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        default:
          throw err;
      }
    }
  }
  //tạo lại và cung cấp token mới cho người dùng(chưa có router)
  async refreshToken(user) {
    const jwt = await this.jwtService.signAsync({ id: user._id });
    return {
      user,
      jwt
    }
  }
  async logout() {
    return await signOut(auth);
  }
  async findUser(user_id) {
    return await this.AccountModel.findById(user_id).exec();
  }
  async findAll() {
    return await this.AccountModel.find().exec();
  }
  async updateUser(user_id, userData) {
    const user = await this.AccountModel.findById(user_id).exec();
    return await this.AccountModel.findByIdAndUpdate(user_id, userData, { new: true }).exec();
  }
  async updatePassword(user_id, oldPassword, newPassword) {
    const currentUser = await this.AccountModel.findById(user_id).exec();
    const isMatch = await bcrypt.compare(oldPassword, currentUser.password);
    if (!isMatch) {
      throw new HttpException("Old password is not correct", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const hashpassword = await bcrypt.hash(newPassword, 12);
    await updatePassword(auth.currentUser, newPassword);

    return await this.AccountModel.findByIdAndUpdate(user_id, { password: hashpassword }, { new: true }).exec();
  }
  async forgotPasswordSendmail(email) {
    const user = await this.AccountModel.findOne({
      $or: [
        { email: email },
        { phone_number: email }
      ]
    }).exec();
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    } else {
      const resetToken = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await sendPasswordResetEmail(auth, user.email, { url: "https://opb-be.vercel.app/common/password/forgot/" })
      return resetToken;
    }
  }
  async deleteUser(user_id) {
    /* return await this.AccountModel.findByIdAndDelete(user_id).exec(); */
    return await this.AccountModel.findByIdAndUpdate(user_id, { status: 'deactivated' }, { new: true }).exec();
  }
}

@Injectable()
export class FirebaseService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(private readonly config: ConfigService) {
    this.storage = new Storage({
      projectId: this.config.get(firebaseConfig.projectId),
      credentials: {
        client_email: firebaseConfig.client_email,
        client_id: firebaseConfig.client_id,
        private_key: firebaseConfig.private_key
      },
    });
    this.bucket = this.storage.bucket(firebaseConfig.storageBucket);
  }

  async uploadFile(folder: string, file: Express.Multer.File) {

    try {
      const key = `${folder}/${file.originalname}`;

      const fileUpload = this.bucket.file(key);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      // console.log('this run');
      blobStream.on('error', error => {
        console.log(error);
        throw new Error('images was not saved to firebase');
      });

      // Resolve the public URL after the upload is finished
      return new Promise<string>((resolve, reject) => {
        blobStream.on('finish', async () => {
          const file = this.bucket.file(key);

          const neverExpireDate = new Date('9999-12-31T23:59:59.999Z');

          const publicUrl = await file.getSignedUrl({
            action: 'read',
            expires: neverExpireDate,
          });

          resolve(publicUrl[0]); // The getSignedUrl() returns an array, so we return the first URL
        });

        // Reject the promise on any stream errors
        blobStream.on('error', reject);

        blobStream.end(file.buffer);
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImage(folder: string, fileName: string): Promise<string> {
    const key = `${folder}/${fileName}`;

    const file = this.bucket.file(key);

    try {
      const neverExpireDate = new Date('9999-12-31T23:59:59.999Z');

      const publicUrl = await file.getSignedUrl({
        action: 'read',
        expires: neverExpireDate,
      });

      return publicUrl[0];
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to get the image from Firebase', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadMultiImage(files: Array<Express.Multer.File>, id: string) {
    const uploadedUrls = [];

    for (const file of files) {
      try {
        const url = await this.uploadFile(id, file);
        uploadedUrls.push(url);
      } catch (error) {
        console.error(error);
      }
    }

    return uploadedUrls;
  }

  async deleteImage(folder: string, fileName: string) {
    const filePath = `${folder}/${fileName}`;
    const file = this.bucket.file(filePath);

    await file.delete();

    console.log(`File ${filePath} deleted successfully.`);
  }
}

