import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, unused-imports/no-unused-vars, no-unused-vars
  var cachedPrisma: PrismaClient | undefined;
}

export const db = globalThis.cachedPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.cachedPrisma = db;
