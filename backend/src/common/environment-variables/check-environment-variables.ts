import { config } from 'dotenv';
import { ZodError } from 'zod';
import { environmentVariables } from './environment-variables';
config();

export const checkEnvironmentVariables = () => {
  try {
    return environmentVariables.parse(process.env);
  } catch (err) {
    if (err instanceof ZodError) {
      const { fieldErrors } = err.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => (errors ? `${field}: ${errors.join(', ')}` : field))
        .join('\n  ');
      throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    }
  }
};
