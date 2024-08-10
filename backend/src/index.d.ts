import { z } from 'zod';
import { environmentVariables } from './common';
type EnvSchemaType = z.infer<typeof environmentVariables>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id: string;
  }
}

declare module 'express' {
  interface Response {
    locals: {
      userId?: number;
    };
  }
}
