export interface IJwt {
  exp: number;
  iat: number;
  iss: string;
  sub: Array<string>;
}
