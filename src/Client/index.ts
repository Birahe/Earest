import { Client, ClientOptions, TextChannel } from "discord.js";
import Logger from "../Logger";
import { CommandHandler } from "../Handlers";
import config from "../Config";
import { readdirSync } from "fs";
import { join } from "path";
import { Player } from "discord-player";
import { Downloader } from "@discord-player/downloader";
import { Reverbnation, Lyrics } from "@discord-player/extractor";

export default class EarestClient extends Client {
  public logger = new Logger(false, "logs");
  public config = config;
  public commandHandler = new CommandHandler(this);
  public player = new Player(this);
  public lyrics = Lyrics.init(config.genius_token);

  constructor(params: ClientOptions) {
    super(params);
    this.player.use("YOUTUBE_DL", Downloader);
    this.player.use("reverbnation", Reverbnation);
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
      if (event.once)
        this.on(event.name, (...args) => event.run(this, ...args));
      else this.on(event.name, (...args) => event.run(this, ...args));
      this.logger.log(`Loaded event ${event.name}`);
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
