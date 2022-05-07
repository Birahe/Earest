import { Command } from "./Command";

export interface CommandHandler {
  load(fileName: string): unknown;
  unload(fileName: string): void;
  reload(fileName: string): void;
  commands: Command[];
  getCommand(name: string): Command | null;
  hasCommand(name: string): boolean;
}
