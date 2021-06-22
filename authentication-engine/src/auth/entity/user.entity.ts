export class User {
    name: string;
    email: string;
    accessToken: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
  }