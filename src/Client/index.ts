import { Config } from "./../Interfaces";
import { Client, ClientOptions } from "discord.js";
import Logger from "../Logger";
import config from "../Config";

export default class EarestClient extends Client {
  public logger: Logger = new Logger(true, "logs");
  public config: Config = config;
  constructor(params: ClientOptions) {
    super(params);
  }

  public start(): void {
    this.logger.log("Starting Earest...");
    this.login(this.config.token);
  }
}
