import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { checkEnvironmentVariables, handleNotFound, handleServerError, logger } from './common';
import { authRouter } from './auth/auth.routes';
import cookieParser from 'cookie-parser';
checkEnvironmentVariables();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use('/auth', authRouter);

app.use(handleNotFound);
app.use(handleServerError);

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
