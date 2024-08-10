import { createLogger, format, transports } from 'winston';
const alignColorsAndTime = format.combine(
  format.colorize({
    all: true,
  }),
  format.label({
    label: '[LOGGER]',
  }),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`),
);
export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.colorize({ all: true }), alignColorsAndTime, format.timestamp()),
  transports: [new transports.Console()],
});