import { Logger as LoggerInterface } from "Interfaces/Logger";
import { writeFileSync, appendFileSync, existsSync } from "fs";
export default class Logger implements LoggerInterface {
  public format: string = "";
  private logsDir: string = "";
  private writeBool: boolean = false;
  private fileName: string = "";
  constructor(writeBool: boolean = false, logsDir: string = "logs") {
    if (writeBool) {
      this.writeBool = writeBool;
      this.format = "YYYY-MM-DD HH:mm:ss";
      const date = new Date();
      this.fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.log`;
      this.logsDir = logsDir;
      this.writeToFile(`[INFO] Logger initialized`);
    }
  }
  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
    if (this.writeBool) {
      this.writeToFile(`[ERROR] ${message}`, ...args);
    }
  }
  log(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
    if (this.writeBool) {
      this.writeToFile(`[INFO] ${message}`, ...args);
    }
  }
  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
    if (this.writeBool) {
      this.writeToFile(`[WARN] ${message}`, ...args);
    }
  }
  setFormat(format: string): void {
    this.format = format;
  }
  writeToFile(message: string, ...args: any[]): void {
    let { fileName } = this;
    const date = new Date();
    const filePath = `${process.cwd()}/${this.logsDir}/${fileName}.log`;
    if (!existsSync(filePath)) {
      appendFileSync(filePath, "", "utf8");
    }
    writeFileSync(
      filePath,
      `${this.format
        .replace("YYYY", date.getFullYear().toString())
        .replace("MM", date.getMonth().toString())
        .replace("DD", date.getDate().toString())} ${this.format
        .replace("HH", date.getHours().toString())
        .replace("mm", date.getMinutes().toString())
        .replace("ss", date.getSeconds().toString())} ${message}\n`,
      { flag: "a" }
    );
  }
}
