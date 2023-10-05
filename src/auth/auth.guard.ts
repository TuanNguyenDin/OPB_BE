import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerGuard implements CanActivate {
  //tạo guard service để xác nhận accessToken
  //khai báo cho jwt service
  constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if(!token) {throw new UnauthorizedException();}//trả về lỗi nếu không có token
    try{
      const payload = await this.jwtService.verifyAsync(token,{secret: process.env.JWT_SECRET});//xác thực token
      request['user'] = payload;
      return true
    } catch{
      throw new UnauthorizedException();
    }
  }
  //hàm tách token từ thuộc tính authorization
  private extractToken(request: Request){
    const [type, token] = request.headers['authorization']?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
