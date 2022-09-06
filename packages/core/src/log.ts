import chalk from 'chalk';
import { PLUGIN_NAME } from './constants';

export enum LOG_TYPE {
  INFO = 'blue',
  WARNING = 'yellow',
  ERROR = 'red',
}

function log(type: LOG_TYPE, message: string) {
  console.log(chalk[type](message));
}

export function logInfo(message: string) {
  const infoMessage = `[${PLUGIN_NAME} info]: ${message}`;
  log(LOG_TYPE.INFO, infoMessage);
}

export function logWarning(message: string) {
  const warningMessage = `[${PLUGIN_NAME} warning]: ${message}`;
  log(LOG_TYPE.WARNING, warningMessage);
}

export function logError(message: string) {
  const errorMessage = `[${PLUGIN_NAME} error]: ${message}`;
  log(LOG_TYPE.ERROR, errorMessage);
  process.exit(1);
}
