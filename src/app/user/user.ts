import {Authority} from '../authority/authority';

export class User {
  userId: number;
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  password: string;
  nationalId: string;
  enabled: number;
  authdata?: string;
  authorityId: Authority;
}
