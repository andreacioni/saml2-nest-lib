import { User } from '../../commons/user';
export declare class UserService {
    private _store;
    constructor();
    storeUser(user: User): void;
    retrieveUser(id: string): User | undefined;
}
