// custom.d.ts
import { Request } from "express";
import { User } from "@prisma/client"; // Adjust this import based on your Prisma setup

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Make user optional as it might not be present on every request
  }
}
