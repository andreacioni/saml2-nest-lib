import express from 'express';
import { SecurityService } from './security.service';
import { UserService } from './user/user.service';
import { SamlStrategy } from './saml.strategy';
export declare class SecurityController {
    private readonly authService;
    private readonly userService;
    private readonly samlStrategy;
    constructor(authService: SecurityService, userService: UserService, samlStrategy: SamlStrategy);
    samlLogin(): Promise<void>;
    samlAssertionConsumer(req: any, res: any): Promise<void>;
    getSpMetadata(res: express.Response): Promise<void>;
}
