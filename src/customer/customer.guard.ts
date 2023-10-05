import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { Observable } from 'rxjs';
import { auth, firebaseConfig } from 'src/firebaseConfig';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) { throw new UnauthorizedException(); }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'secret' });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true
  }
  private extractToken(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
@Injectable()
export class firebaseAuthentication implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) { throw new UnauthorizedException(); }
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      const access = await admin.auth().verifyIdToken(token);
      console.log(access);
      return !!access
    } catch(error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  private extractToken(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

}