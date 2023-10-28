
import type { Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';
import { AuthenticatedRequest } from './users/user.types.js';
import { StatusCodes } from './status-codes.js';


export default async function AuthMiddleware(request: AuthenticatedRequest, response: ExpressResponse, next: ExpressNextFunction) {
  // Ensure user is authenticated
  const authRequest: AuthenticatedRequest = request;
  if (!authRequest.session.isLoggedIn) {
    response.status(StatusCodes.FORBIDDEN).json({ error: 'User not logged in'})
    return;
  }

  if (!authRequest.session.userId) {
    response.status(StatusCodes.FORBIDDEN).json({ error: 'User not logged in. User ID not set.'})
    return;
  }

  next();
}
