import * as express from "express";
import { AuthenticatedRequest } from "./users/user.types.js";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  if (securityName === "mixio_auth") {
    if (!request.session) {
      return Promise.reject({ error: 'User not logged in'});
    }

    const authRequest: AuthenticatedRequest = request;
    if (!authRequest.session.userId) {
      return Promise.reject({ error: 'User ID not set'});
    }

    return Promise.resolve({});
  }

  return Promise.resolve({});
}