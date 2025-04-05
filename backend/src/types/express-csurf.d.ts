// src/types/express-csurf.d.ts
import "express";

declare global {
  namespace Express {
    export interface Request {
      csrfToken(): string;
    }
  }
}
