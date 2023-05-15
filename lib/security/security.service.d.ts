import { User } from '../commons/user';
import { JwtService } from '@nestjs/jwt';
export declare class SecurityService {
    private jwtService;
    constructor(jwtService: JwtService);
    getTokenForUser(user: User): string;
}
