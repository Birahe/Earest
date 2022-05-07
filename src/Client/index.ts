import { Config } from "../Interfaces";
import { Client, ClientOptions } from "discord.js";
import Logger from "../Logger";
import { CommandHandler } from "../Handlers";
import config from "../Config";
import { readdirSync } from "fs";
import { join } from "path";

export default class EarestClient extends Client {
  public logger: Logger = new Logger(false, "logs");
  public config: Config = config;
  public commandHandler: CommandHandler = new CommandHandler(this);
  constructor(params: ClientOptions) {
    super(params);
  }

  public start(): void {
    this.logger.log("Starting Earest...");
    this.login(this.config.token);
    this.loadEvents();
  }

  public loadEvents(): void {
    this.logger.log("Loading events...");
    const events = readdirSync(join(__dirname, "../Events")).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of events) {
      const event = require(`../Events/${file}`).default;
      const eventName = event.name;
      if (event.once) this.on(eventName, (...args) => event.run(this, ...args));
      else this.on(eventName, (...args) => event.run(this, ...args));
      this.logger.log(`Loaded event ${eventName}`);
    }
  }

  public registerCommands(): void {
    readdirSync(join(__dirname, "..", "Commands")).forEach((dir) => {
      const commands = readdirSync(
        join(__dirname, "..", "Commands", dir)
      ).filter((file) => file.endsWith(".ts"));
      for (const command of commands) {
        this.commandHandler.load(
          join(__dirname, "..", "Commands", dir, command)
        );
      }
    });
  }
}
