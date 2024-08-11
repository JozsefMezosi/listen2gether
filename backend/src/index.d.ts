import { z } from 'zod';
import { environmentVariables } from './common';
/* import { UserId } from './user/model'; */
type EnvSchemaType = z.infer<typeof environmentVariables>;

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvSchemaType {}
  }
}

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id: string;
  }
}

/* declare module 'express' {
  interface Response {
    locals: {
      userId?: UserId;
    };
  }
} */
