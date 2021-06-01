import {IJwt} from './i-jwt';

export interface IUser {
  userId: number;
  username: string;
  profilePictureUrl: string;
  jwt: string;
  parsedJwt: IJwt;
}
