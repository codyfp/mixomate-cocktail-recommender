// src/app.ts
import express, { 
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../build/routes.js"

export const expressApp = express();

// Use body parser to read sent json payloads
expressApp.use(urlencoded({ extended: true }));
expressApp.use(json());

// Handling missing routes
expressApp.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
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
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

// Register tsoa-generated routes with Express server
RegisterRoutes(expressApp);
