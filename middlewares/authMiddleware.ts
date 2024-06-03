import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../DB/db-config";

dotenv.config({ path: ".env" });

const jwtsecret = process.env.JWT_SECRET || "";

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  };
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || "";
  if (!token) {
    return next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
  }
  try {
    const payload = jwt.verify(token, jwtsecret) as { userId: number };
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      return next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED));
  }
};

export default authMiddleware;
