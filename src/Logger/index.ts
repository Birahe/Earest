import { Logger as LoggerInterface } from "Interfaces/Logger";
export default class Logger implements LoggerInterface {
  public format: string = "";
  constructor() {}
  debug(message: string, ...args: any[]): void {}
  error(message: string, ...args: any[]): void {}
  log(message: string, ...args: any[]): void {}
  warn(message: string, ...args: any[]): void {}
  setFormat(format: string): void {}
}
