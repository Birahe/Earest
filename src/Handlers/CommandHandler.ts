import EarestClient from "Client";
import { Command, CommandHandler as ICommandHandler } from "Interfaces";

export class CommandHandler implements ICommandHandler {
  public commands: Command[] = [];
  constructor(public client: EarestClient) {}
  public load(fileName: string) {
    const command = require(fileName).default;
    try {
      if (!this.client.application) return;
      if (!command) return;
      this.client.logger.debug(`Registering command ${command.name}`);
      this.commands.push(command);
      if (process.env.NODE_ENV == "development")
        return this.client.guilds.cache
          .get("942107219242147931")
          ?.commands.set(this.commands as any);
      this.client.application.commands.set(this.commands as any);
    } catch (e) {
      this.client.logger.warn("Failed to load command " + command.name);
    } finally {
      this.client.logger.log("Loaded command " + command.name);
    }
  }
  public unload(fileName: string): void {}
  public reload(fileName: string): void {}
  public getCommand(name: string): Command | null {
    return this.commands.find((c) => c.name === name) || null;
  }
  public hasCommand(name: string): boolean {
    return !!this.commands.find((c) => c.name === name);
  }
}
