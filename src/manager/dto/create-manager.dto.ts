import { CreateUserDto } from "src/auth/dto/create-user.dto";

export class CreateManagerDto implements CreateUserDto{
    name: string;
    phone: string;
    email: string;
    position: string;
    dateStart: Date;
    password: string;
    isAdmin: boolean;
}
