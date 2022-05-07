import EarestClient from "../Client";
import { ClientEvents } from "discord.js";

export interface Event<T extends keyof ClientEvents> {
  name: T;
  once?: boolean;
  run(client: EarestClient, ...args: ClientEvents[T]): void;
}
