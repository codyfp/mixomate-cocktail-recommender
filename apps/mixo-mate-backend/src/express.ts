import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import session from "express-session"
import MongoStore from 'connect-mongo'
import cors from 'cors'

import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../build/routes.js"
import { StatusCodes } from "./status-codes.js";

export const expressApp = express();

// Use body parser to read sent json payloads
expressApp.use(urlencoded({ extended: true }));
expressApp.use(json());
expressApp.options('*', cors({
  origin: ['http://localhost:3000', 'http://0.0.0:3000'],
  credentials: true
}))
expressApp.use(cors({
  origin: ['http://localhost:3000', 'http://0.0.0.0:3000'],
  credentials: true
}))

expressApp.use(session({
  name: 'mixo-mate-auth',
  secret: 'my very secure password',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://root:pass12345@mongo:27017' }),
  cookie: {
    secure: false // Must be false as we are using HTTP (not HTTPS)
  }
}));

// Register tsoa-generated routes with Express server
RegisterRoutes(expressApp);

// Handling missing routes
expressApp.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(StatusCodes.NOT_FOUND).send({
    message: "Not Found",
  });
});

// Implement generic error handler
expressApp.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Internal Server Error. ${err.message}`,
    });
  }

  next();
});

// Create endpoint to view routes
expressApp.get('/routes', (req, res) => {
  res.send(expressApp._router.stack
    .filter(r => r.route)
    .map(r => r.route.path))
})
