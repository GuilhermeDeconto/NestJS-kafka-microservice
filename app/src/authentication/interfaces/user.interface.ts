export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    accessToken: string;
    status?: 'ACTIVE' | 'INACTIVE';
  }