import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  //tạo guard service để xác nhận accessToken
  //khai báo cho jwt service
  constructor(private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractToken(request); //tách token từ thuộc tính authorization
      if (!token) { throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED); }//trả về lỗi nếu không có token
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });//xác thực token
      request['user'] = payload;
      return true
    } catch (err) {
      // throw new UnauthorizedException();
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  //hàm tách token từ thuộc tính authorization
  private extractToken(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
