import { createLogger, format, transports } from 'winston';

function formatObject(param) {
  if (param instanceof Object) {
    return JSON.stringify(param);
  }
  return param;
}

// Format splat into message string
const all = format(info => {
  const splat = info[Symbol.for('splat')] || [];
  const message = formatObject(info.message);
  const rest = splat.map(formatObject).join(' ');
  info.message = `${message} ${rest}`;
  return info;
});

export const Logger = createLogger({
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    all(),
    format.colorize(),
    format.align(),
    format.printf(info => {
      return `${info.level}: ${formatObject(info.message)}`;
    })
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: format.simple(),
  }));
}
