"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const security_service_1 = require("./security.service");
const saml_auth_guard_1 = require("./saml-auth.guard");
const user_service_1 = require("./user/user.service");
const saml_strategy_1 = require("./saml.strategy");
const common_2 = require("@nestjs/common");
let SecurityController = class SecurityController {
    constructor(authService, userService, samlStrategy) {
        this.authService = authService;
        this.userService = userService;
        this.samlStrategy = samlStrategy;
    }
    samlLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    samlAssertionConsumer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const user = req.user;
                const jwt = this.authService.getTokenForUser(user);
                common_2.Logger.debug(`generated jwt: ${jwt}`);
                this.userService.storeUser(user);
                this, res.redirect('/?jwt=' + jwt);
            }
            else {
                common_2.Logger.warn('there was an error during authentication, please try again');
            }
        });
    }
    getSpMetadata(res) {
        return __awaiter(this, void 0, void 0, function* () {
            common_2.Logger.debug('generating metadata');
            const ret = this.samlStrategy.generateServiceProviderMetadata(null, null);
            res.type('application/xml');
            res.send(ret);
        });
    }
};
__decorate([
    (0, common_1.Get)('api/auth/sso/saml/login'),
    (0, common_1.UseGuards)(saml_auth_guard_1.SamlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "samlLogin", null);
__decorate([
    (0, common_1.Post)('api/auth/sso/saml/ac'),
    (0, common_1.UseGuards)(saml_auth_guard_1.SamlAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "samlAssertionConsumer", null);
__decorate([
    (0, common_1.Get)('api/auth/sso/saml/metadata'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "getSpMetadata", null);
SecurityController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [security_service_1.SecurityService,
        user_service_1.UserService,
        saml_strategy_1.SamlStrategy])
], SecurityController);
exports.SecurityController = SecurityController;
