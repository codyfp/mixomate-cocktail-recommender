import session from 'express-session';

export interface AuthenticatedRequest extends Express.Request {
  session: session.Session & {
    isLoggedIn: boolean;
    userId?: string;
  };
}