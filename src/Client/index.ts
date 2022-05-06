import { Client, ClientOptions } from "discord.js";
import Logger from "../Logger";

export default class EarestClient extends Client {
  public logger: Logger = new Logger(true, "logs");
  constructor(params: ClientOptions) {
    super(params);
  }
}
