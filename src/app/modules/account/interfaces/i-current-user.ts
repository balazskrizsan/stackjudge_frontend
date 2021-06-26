import {IJwt} from './i-jwt';

export interface ICurrentUser {
  userId: number;
  username: string;
  profilePictureUrl: string;
  jwt: string;
  parsedJwt: IJwt;
}
