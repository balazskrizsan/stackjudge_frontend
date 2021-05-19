import {IJwt} from './i-jwt';

export interface IUser {
  userId: number;
  username: string;
  jwt: string;
  parsedJwt: IJwt;
}
