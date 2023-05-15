import { Strategy, Profile } from 'passport-saml';
import { User } from '../commons/user';
declare const SamlStrategy_base: new (...args: any[]) => Strategy;
export declare class SamlStrategy extends SamlStrategy_base {
    constructor();
    validate(profile: Profile): Promise<User>;
}
export {};
