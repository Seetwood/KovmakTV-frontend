import { Authority } from "./Authority";

export class CredentialResponse {
  [x: string]: any;
  authenticated: boolean;
  username: string;
  roles: Authority[];
  authorities: Authority[];
  id: number;

  static convertToObj(obj: any): CredentialResponse | null {
    if (obj == null) {
      return null;
    }
    if (obj.errorStatus !== undefined) {
      const resp = new CredentialResponse();
      resp.authenticated = false;

      return resp;
    }
    else {
      const resp = new CredentialResponse();
      resp.username = obj.username;
      resp.authenticated = obj.authenticated;
      resp.authorities = obj.authorities;
      return resp;
    }
  }
}