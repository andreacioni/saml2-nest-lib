import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Response,
  Header,
} from '@nestjs/common';
import { resolve } from 'path';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SamlAuthGuard } from './saml-auth.guard';
import { UserService } from './user/user.service';
import { User } from '../commons/user';
import { SamlStrategy } from './saml.strategy';

import { Logger } from '@nestjs/common';

@Controller()
export class SecurityController {
  constructor(
    private readonly authService: SecurityService,
    private readonly userService: UserService,
    private readonly samlStrategy: SamlStrategy,
  ) {}

  @Get('api/auth/sso/saml/login')
  @UseGuards(SamlAuthGuard)
  async samlLogin() {
    //this route is handled by passport-saml
    return;
  }

  @Post('api/auth/sso/saml/ac')
  @UseGuards(SamlAuthGuard)
  async samlAssertionConsumer(@Request() req: any, @Response() res: any) {
    //this routes gets executed on successful assertion from IdP
    if (req.user) {
      const user = req.user as User;
      const jwt = this.authService.getTokenForUser(user);
      Logger.debug(`generated jwt: ${jwt}`);
      this.userService.storeUser(user);
      this, res.redirect('/?jwt=' + jwt);
    } else {
      Logger.warn('there was an error during authentication, please try again');
    }
  }

  @Get('api/auth/sso/saml/metadata')
  @Header('Content-Type', 'application/xml')
  async getSpMetadata() {
    Logger.debug('generating metadata');
    return this.samlStrategy.generateServiceProviderMetadata(null, null);
  }
}
